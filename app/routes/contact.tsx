import { useTranslation } from 'react-i18next';
import { SeoMeta } from '../components';

const pageMeta = {
  title: 'Contact Us',
  description: 'Get in touch with Eveo for event organization and supplier inquiries',
};

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <SeoMeta {...pageMeta} />
      <h1 className="text-3xl font-bold mb-6">{t('contact.title', 'Contact Us')}</h1>
      <div className="prose max-w-none">
        <p>{t('contact.content')}</p>
      </div>
    </div>
  );
}
