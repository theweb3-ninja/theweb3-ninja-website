import { PageMetadata } from 'shared';
import { isProduction, VITE_ENV } from '../config';
import { useMeta } from '../hooks';
import {
  getShortEnv,
  isHttpEquivMeta,
  isLinkTag,
  isNamedMeta,
  isPropertyMeta,
  isTitleTag,
  normalizeContent,
} from '../lib';

export const SeoMeta = (pageMeta: PageMetadata) => {
  const tags = useMeta(pageMeta);

  return (
    <>
      {tags.map((t, idx) => {
        if (isTitleTag(t)) {
          return <title key={`title-${idx}`}>{`${isProduction ? '' : `[${getShortEnv(VITE_ENV)}] `}${t.title}`}</title>;
        }

        if (isLinkTag(t)) {
          const href = Array.isArray(t.href) ? t.href[0] : t.href;
          const key = `link-${t.rel}-${href ?? 'nohref'}-${t.hreflang ?? 'nohreflang'}-${idx}`;
          return <link key={key} rel={t.rel} href={href} {...(t.hreflang ? { hrefLang: t.hreflang } : {})} />;
        }

        if (isNamedMeta(t)) {
          const content = normalizeContent(t.content);
          return <meta key={`meta-name-${t.name}-${idx}`} name={t.name} {...(content ? { content } : {})} />;
        }

        if (isPropertyMeta(t)) {
          const content = normalizeContent(t.content);

          return (
            <meta key={`meta-prop-${t.property}-${idx}`} property={t.property} {...(content ? { content } : {})} />
          );
        }

        if (isHttpEquivMeta(t)) {
          const content = normalizeContent(t.content);

          return (
            <meta key={`meta-http-${t.httpEquiv}-${idx}`} httpEquiv={t.httpEquiv} {...(content ? { content } : {})} />
          );
        }

        return null;
      })}
    </>
  );
};
