import { resources } from '../config';

export type HttpEquivMetaTag = { httpEquiv: string; content: string | string[] };

export type LangKey = keyof typeof resources;

export type LinkTag = { tagName: 'link'; rel: string; href: string | string[]; hreflang?: string };

export type NamedMetaTag = { name: string; content: string | string[] };

export type PropertyMetaTag = { property: string; content: string | string[] };

export type TitleTag = { title: string };

export type Tag = TitleTag | LinkTag | NamedMetaTag | PropertyMetaTag | HttpEquivMetaTag;
