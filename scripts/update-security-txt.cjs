#!/usr/bin/env node

/**
 * Script to update the security.txt file with correct domain information
 * Based on RFC 9116 requirements: https://www.rfc-editor.org/rfc/rfc9116.html
 */

const fs = require('fs');
const path = require('path');

// Import domain constants - using dynamic import for ESM compatibility in CJS
async function updateSecurityTxt() {
  try {
    // Load .env into process.env (prefer dotenv, fallback to manual parse)
    try {
      // Try to use dotenv if available
      require('dotenv').config();
    } catch (e) {
      // Fallback: light parser to populate process.env from .env
      if (fs.existsSync('.env')) {
        const lines = fs.readFileSync('.env', 'utf8').split(/\r?\n/);
        for (const line of lines) {
          if (!line || line.trim().startsWith('#')) continue;
          const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
          if (m) {
            let val = m[2].trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
              val = val.slice(1, -1);
            }
            if (process.env[m[1]] == null) process.env[m[1]] = val;
          }
        }
      }
    }

    const domain = process.env.VITE_DOMAIN_EVEO_GLOBAL;
    const email = process.env.VITE_EMAIL_SECURITY || 'security@geteveo.com';

    if (!domain) {
      throw new Error('VITE_DOMAIN_EVEO_GLOBAL is not set in environment (.env)');
    }

    // Calculate expiration date (3 years from now)
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 3);
    const formattedExpiration = expirationDate.toISOString().split('T')[0];

    // Create security.txt content
    const securityTxtContent = `# Security Contact Information for ${domain}
# Last updated: ${new Date().toISOString().split('T')[0]}

Contact: mailto:${email}
Expires: ${formattedExpiration}
Canonical: https://${domain}/.well-known/security.txt
Policy: https://${domain}/privacy-policy
Security: ${email}
Preferred-Languages: en, it, es

# This security.txt file follows RFC 9116: https://www.rfc-editor.org/rfc/rfc9116.html
`;

    // Ensure .well-known directory exists
    const wellKnownDir = path.join(__dirname, '../dist/client/.well-known');

    if (!fs.existsSync(wellKnownDir)) {
      fs.mkdirSync(wellKnownDir, { recursive: true });
    }

    // Write to security.txt file
    fs.writeFileSync(path.join(wellKnownDir, 'security.txt'), securityTxtContent);

    // Also create a copy at the root for compatibility
    fs.writeFileSync(path.join(__dirname, '../dist/client/security.txt'), securityTxtContent);
    console.log('✅ Created copy at /public/security.txt for compatibility');
  } catch (error) {
    console.error('❌ Error updating security.txt:', error.message);
    process.exit(1);
  }
}

updateSecurityTxt();
