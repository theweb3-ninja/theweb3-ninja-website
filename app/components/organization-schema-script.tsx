import { useTranslation } from 'react-i18next';
import { getOrganizationSchema } from '../lib';

export const OrganizationSchemaScript = ({ language }: { language: string }) => {
  const { t } = useTranslation();
  const content = getOrganizationSchema(t, language);

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(content) }} />;
};
