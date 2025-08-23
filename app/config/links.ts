import { EMAIL_GENERAL } from './constants';
import { SocialLinks } from 'shared';

// Social Media Links
export const socialLinks: SocialLinks[] = [
  // facebook: {
  //   name: 'Facebook',
  //   url: 'https://www.facebook.com/eveo',
  //   ariaLabel: 'Facebook',
  //   description: 'Join our community for updates and promotions',
  //   color: 'text-blue-600',
  // },
  // linkedin: {
  //   name: 'LinkedIn',
  //   url: 'https://www.linkedin.com/in/eveo',
  //   ariaLabel: 'LinkedIn',
  //   description: 'Connect with us professionally',
  //   color: 'text-blue-400',
  // },
  // instagram: {
  //   name: 'Instagram',
  //   url: 'https://www.instagram.com/eveo',
  //   ariaLabel: 'Instagram',
  //   description: 'See our latest products and stories',
  //   color: 'text-pink-600',
  // },
  // tiktok: {
  //   name: 'TikTok',
  //   url: 'https://www.tiktok.com/@eveo',
  //   ariaLabel: 'TikTok',
  //   description: 'Watch our latest videos and behind-the-scenes',
  //   color: 'text-black',
  // },
];

// Contact Information
export const contactInfo = {
  email: {
    value: EMAIL_GENERAL,
    url: `mailto:${EMAIL_GENERAL}`,
  },
};
