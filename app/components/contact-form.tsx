import { DownloadIcon, FileIcon, FileTextIcon, PaperPlaneIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  type ContactFormReactState,
  type EmailOctopusResponse,
  EventType,
  ServiceType,
  UserType,
  type ValidationError,
} from '../../shared';
import { useToast } from '../hooks';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  userType: UserType;
}

export const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose, userType }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormReactState>({
    FirstName: '',
    LastName: '',
    CompanyName: '',
    EmailAddress: '',
    Phone: '',
    UserType: userType,
    EventType: EventType.Business,
    ServiceTypes: [],
  });

  // Validation functions
  const validateField = (field: string, value: string): ValidationError | null => {
    switch (field) {
      case 'FirstName':
      case 'LastName':
        if (!value.trim()) {
          return { field, message: `${field} is required` };
        }
        if (value.length > 60) {
          return { field, message: `${field} must be less than 60 characters` };
        }
        break;
      case 'CompanyName':
        if (userType === UserType.Supplier && !value.trim()) {
          return { field, message: t('contact.errorCompanyRequired') };
        }
        if (value.length > 125) {
          return { field, message: `Company name must be less than 125 characters` };
        }
        break;
      case 'EmailAddress': {
        if (!value.trim()) {
          return { field, message: `Email is required` };
        }
        if (value.length > 125) {
          return { field, message: `Email must be less than 125 characters` };
        }
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return { field, message: `Invalid email format` };
        }
        break;
      }
      case 'Phone':
        if (value && value.length > 125) {
          return { field, message: `Phone must be less than 125 characters` };
        }
        break;
    }
    return null;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceTypeChange = (serviceType: ServiceType, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      ServiceTypes: checked
        ? [...prev.ServiceTypes, serviceType]
        : prev.ServiceTypes.filter(type => type !== serviceType),
    }));
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields in step 1
    const errors: ValidationError[] = [];
    const fieldsToValidate = ['FirstName', 'EmailAddress'];

    if (userType === UserType.Supplier) {
      fieldsToValidate.push('LastName');
      fieldsToValidate.push('CompanyName');
    }

    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData] as string);
      if (error) errors.push(error);
    });

    if (errors.length > 0) {
      toast({
        title: t('contact.error'),
        description: errors[0].message,
        variant: 'destructive',
      });
      return;
    }

    setStep(2);
  };

  // Secure download function for bonus pack
  const downloadBonusPack = () => {
    try {
      // Create a temporary anchor element for download
      const link = document.createElement('a');
      link.href = '/files/theweb3ninja_spreadsheet_and_pdf_bonuspack.zip';
      link.download = 'theweb3ninja_spreadsheet_and_pdf_bonuspack.zip';
      link.style.display = 'none';

      // Add to DOM, trigger download, then remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('Bonus pack download initiated');
    } catch (error) {
      console.error('Error initiating download:', error);
      toast({
        title: 'Download Error',
        description: 'Unable to download bonus pack. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userType === 'organizer' && !formData.EventType) {
      toast({
        title: t('contact.error'),
        description: t('contact.errorEventType'),
        variant: 'destructive',
      });
      return;
    }

    if (userType === 'supplier' && formData.ServiceTypes.length === 0) {
      toast({
        title: t('contact.error'),
        description: t('contact.errorServiceType'),
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // Submit to API endpoint
      const response = await fetch('/theweb3ninja-api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(
          `API returned ${contentType || 'unknown content type'} instead of JSON. Status: ${response.status}`
        );
      }

      const data = (await response.json()) as EmailOctopusResponse;

      if (typeof data.status === 'string' && data.status === 'subscribed') {
        toast({
          title: t('contact.successTitle'),
          description: t('contact.successMessage'),
        });

        // Trigger secure download for organizers
        if (userType === UserType.Organizer) {
          downloadBonusPack();
        }

        handleClose();
      } else {
        toast({
          title: t('contact.error'),
          description: data.detail || t('contact.error'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: t('contact.error'),
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setFormData({
      FirstName: '',
      LastName: '',
      CompanyName: '',
      EmailAddress: '',
      Phone: '',
      UserType: userType,
      EventType: EventType.Business,
      ServiceTypes: [],
    });
    onClose();
  };

  useEffect(() => {
    setFormData(prev => ({ ...prev, UserType: userType }));
  }, [userType]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            {step === 1
              ? userType === UserType.Organizer
                ? t('contact.organizerTitle')
                : t('contact.title')
              : userType === UserType.Organizer
                ? t('contact.eventInfo')
                : t('contact.serviceInfo')}
          </DialogTitle>
          <div className="text-center">
            <p className="text-sm text-gray-600 mt-3 mb-4">
              {step === 1
                ? t('contact.fillPersonalInfo', 'Please fill in your personal information')
                : userType === UserType.Organizer
                  ? t('contact.fillEventInfo', 'Please tell us about your event')
                  : t('contact.fillServiceInfo', 'Please select the services you provide')}
            </p>
            {userType === UserType.Organizer && (
              <div className="mb-4 p-4 bg-theweb3ninja/5 rounded-lg border border-theweb3ninja/10">
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex items-center gap-2">
                    <FileTextIcon className="w-5 h-5 text-theweb3ninja" />
                    <span>{t('contact.pdfGuide')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileIcon className="w-5 h-5 text-theweb3ninja" />
                    <span>{t('contact.excelSheet')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogHeader>
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-4">
            <input type="hidden" name="userType" value={userType} />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">
                  {t('contact.firstName')} {t('contact.required')}
                </Label>
                <Input
                  id="firstName"
                  value={formData.FirstName}
                  onChange={e => handleInputChange('FirstName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">
                  {t('contact.lastName')} {userType === UserType.Supplier ? t('contact.required') : ''}
                </Label>
                <Input value={formData.LastName} onChange={e => handleInputChange('LastName', e.target.value)} />
              </div>
            </div>

            <div>
              <Label htmlFor="companyName">
                {t('contact.companyName')} {userType === UserType.Supplier ? t('contact.required') : ''}
              </Label>
              <Input
                id="companyName"
                value={formData.CompanyName}
                onChange={e => handleInputChange('CompanyName', e.target.value)}
                required={userType === UserType.Supplier}
              />
            </div>

            <div>
              <Label htmlFor="email">
                {t('contact.email')} {t('contact.required')}
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.EmailAddress}
                onChange={e => handleInputChange('EmailAddress', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">{t('contact.phone')}</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.Phone}
                onChange={e => handleInputChange('Phone', e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : t('contact.continue')}
            </Button>
          </form>
        )}

        {step === 2 && userType === UserType.Organizer && (
          <form onSubmit={handleStep2Submit} className="space-y-4">
            <div>
              <Label className="text-base font-medium">
                {t('contact.eventTypeQuestion')} {t('contact.required')}
              </Label>
              <RadioGroup
                value={formData.EventType}
                onValueChange={value => handleInputChange('EventType', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="personal" id="personal" />
                  <Label htmlFor="personal">{t('contact.eventTypePersonal')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="business" id="business" />
                  <Label htmlFor="business">{t('contact.eventTypeBusiness')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="both" />
                  <Label htmlFor="both">{t('contact.eventTypeBoth')}</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                {t('contact.back')}
              </Button>

              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? (
                  'Processing...'
                ) : (
                  <>
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    {t('contact.downloadResourcesOrganizer')}
                  </>
                )}
              </Button>
            </div>
          </form>
        )}

        {step === 2 && userType === UserType.Supplier && (
          <form onSubmit={handleStep2Submit} className="space-y-4">
            <div>
              <Label className="text-base font-medium">
                {t('contact.serviceTypeQuestion')} {t('contact.required')}
              </Label>
              <div className="mt-2 space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hotel"
                    checked={formData.ServiceTypes.includes(ServiceType.Hotel)}
                    onCheckedChange={checked => handleServiceTypeChange(ServiceType.Hotel, checked as boolean)}
                  />
                  <Label htmlFor="hotel">{t('contact.serviceHotel')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="photo-video"
                    checked={formData.ServiceTypes.includes(ServiceType.PhotoVideo)}
                    onCheckedChange={checked => handleServiceTypeChange(ServiceType.PhotoVideo, checked as boolean)}
                  />
                  <Label htmlFor="photo-video">{t('contact.servicePhotoVideo')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="catering"
                    checked={formData.ServiceTypes.includes(ServiceType.Catering)}
                    onCheckedChange={checked => handleServiceTypeChange(ServiceType.Catering, checked as boolean)}
                  />
                  <Label htmlFor="catering">{t('contact.serviceCatering')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="merchandise"
                    checked={formData.ServiceTypes.includes(ServiceType.Merchandise)}
                    onCheckedChange={checked => handleServiceTypeChange(ServiceType.Merchandise, checked as boolean)}
                  />
                  <Label htmlFor="merchandise">{t('contact.serviceMerchandise')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="audio-video"
                    checked={formData.ServiceTypes.includes(ServiceType.AudioVideo)}
                    onCheckedChange={checked => handleServiceTypeChange(ServiceType.AudioVideo, checked as boolean)}
                  />
                  <Label htmlFor="audio-video">{t('contact.serviceAudioVideo')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dj"
                    checked={formData.ServiceTypes.includes(ServiceType.Deejay)}
                    onCheckedChange={checked => handleServiceTypeChange(ServiceType.Deejay, checked as boolean)}
                  />
                  <Label htmlFor="dj">{t('contact.serviceDj')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="transport"
                    checked={formData.ServiceTypes.includes(ServiceType.Transport)}
                    onCheckedChange={checked => handleServiceTypeChange(ServiceType.Transport, checked as boolean)}
                  />
                  <Label htmlFor="transport">{t('contact.serviceTransport')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="leisure"
                    checked={formData.ServiceTypes.includes(ServiceType.Leisure)}
                    onCheckedChange={checked => handleServiceTypeChange(ServiceType.Leisure, checked as boolean)}
                  />
                  <Label htmlFor="leisure">{t('contact.serviceLeisure')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="consulting"
                    checked={formData.ServiceTypes.includes(ServiceType.Consulting)}
                    onCheckedChange={checked => handleServiceTypeChange(ServiceType.Consulting, checked as boolean)}
                  />
                  <Label htmlFor="consulting">{t('contact.serviceConsulting')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="other"
                    checked={formData.ServiceTypes.includes(ServiceType.Other)}
                    onCheckedChange={checked => handleServiceTypeChange(ServiceType.Other, checked as boolean)}
                  />
                  <Label htmlFor="other">{t('contact.serviceOther')}</Label>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                {t('contact.back')}
              </Button>

              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? (
                  'Processing...'
                ) : userType.toString() === UserType.Organizer.toString() ? (
                  <>
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    {t('contact.downloadResourcesOrganizer')}
                  </>
                ) : (
                  <>
                    <PaperPlaneIcon className="w-4 h-4 mr-2" />
                    {t('contact.submit')}
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
