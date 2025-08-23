import { HttpEquivMetaTag, LinkTag, NamedMetaTag, PropertyMetaTag, TitleTag } from '../types';

export const isTitleTag = (t: unknown): t is TitleTag => typeof (t as Record<string, unknown>)?.title === 'string';

export const isLinkTag = (t: unknown): t is LinkTag => {
  const r = t as Record<string, unknown>;

  return r?.tagName === 'link' && typeof r?.rel === 'string' && r?.href !== undefined;
};

export const isNamedMeta = (t: unknown): t is NamedMetaTag => {
  const r = t as Record<string, unknown>;

  return typeof r?.name === 'string' && (typeof r?.content === 'string' || Array.isArray(r?.content));
};

export const isPropertyMeta = (t: unknown): t is PropertyMetaTag => {
  const r = t as Record<string, unknown>;

  return typeof r?.property === 'string' && (typeof r?.content === 'string' || Array.isArray(r?.content));
};

export const isHttpEquivMeta = (t: unknown): t is HttpEquivMetaTag => {
  const r = t as Record<string, unknown>;

  return typeof r?.httpEquiv === 'string' && (typeof r?.content === 'string' || Array.isArray(r?.content));
};

export const normalizeContent = (c: string | string[] | undefined): string | undefined =>
  Array.isArray(c) ? c.join(', ') : c;
