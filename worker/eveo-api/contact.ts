import { ContactFormReactState, EmailOctopusData, EmailOctopusResponse } from '../../shared';

/**
 * Handles contact form submissions by:
 * 1. Validating the form data
 * 2. Adding the contact to the appropriate EmailOctopus list
 * 3. Sending notification email if configured
 * 4. Returning appropriate response
 *
 * @param env Environment variables
 * @param request The request containing form data
 * @returns Response with success or error information
 */
export async function handleContactSubmission(env: Env, request: Request): Promise<Response> {
  const listId = env.EMAIL_LIST_ID_ENV; // Use a single list for all contacts
  const apiKey = env.EMAILOCTOPUS_API_KEY_ENV; // Add API key to URL query parameters as per EmailOctopus documentation

  try {
    // Parse the form data from the request
    const formData: ContactFormReactState = await request.json();

    // Validation for basic fields
    if (!formData.EmailAddress || !formData.FirstName) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validation for organizer event type
    if (formData.UserType === 'organizer' && !formData.EventType) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Event type is required for organizers',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validation for supplier service types
    if (formData.UserType === 'supplier' && (!formData.ServiceTypes || formData.ServiceTypes.length === 0)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'At least one service type is required for suppliers',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validation for list ID
    if (!listId) {
      console.error(`List ID not found for user type: ${formData.UserType}`);

      return new Response(
        JSON.stringify({
          success: false,
          error: 'Configuration error',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Prepare EmailOctopus API request data
    const emailOctopusData: EmailOctopusData = {
      email_address: formData.EmailAddress,
      fields: {
        EmailAddress: formData.EmailAddress,
        FirstName: formData.FirstName,
        LastName: formData.LastName,
        CompanyName: formData.CompanyName || '',
        Phone: formData.Phone || '',
        EventType: formData.EventType,
        UserType: formData.UserType,
      },
      tags: [],
      status: 'subscribed',
    };

    // Add tag based on event type for organizers
    if (formData.UserType === 'supplier') {
      emailOctopusData.tags = [];

      formData.ServiceTypes.forEach(serviceType => {
        emailOctopusData.tags.push(serviceType);
      });
    }

    // Block request if API key is not configured
    if (!apiKey) {
      console.error('EmailOctopus API key is not configured');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Configuration error',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('EmailOctopus API request data:', emailOctopusData);

    // Make API request to EmailOctopus v2
    const response = await fetch(`https://api.emailoctopus.com/lists/${listId}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(emailOctopusData),
    });

    const responseData = (await response.json()) as EmailOctopusResponse;

    let detail = responseData.detail || undefined;

    // Handle EmailOctopus API response
    if (responseData.detail && responseData.detail.length > 0) {
      console.error('EmailOctopus API error:', responseData);
      detail = responseData.detail || 'Error adding contact';

      // Return error response with a valid HTTP status code
      return new Response(
        JSON.stringify({
          detail: detail,
          id: responseData.id,
          status: responseData.status,
        }),
        {
          status: typeof responseData.status === 'string' ? 200 : responseData.status, // Use 400 Bad Request as the HTTP status code for errors
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Return success response
    return new Response(
      JSON.stringify({
        id: responseData.id,
        detail: detail || 'Contact added successfully',
        status: responseData.status,
      }),
      {
        status: typeof responseData.status === 'string' ? 200 : responseData.status,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Contact submission error:', error);

    return new Response(
      JSON.stringify({
        detail: 'Server error processing the request',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
