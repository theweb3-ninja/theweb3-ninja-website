// Import test utilities
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom';

// Extend Vitest's expect method with testing-library methods
expect.extend(matchers);

// Run cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

// Setup mock for window.location
Object.defineProperty(global, 'window', {
  value: {
    location: {
      host: 'eveo.com',
      pathname: '/',
      href: 'https://eveo.com/',
      search: '',
      hash: '',
    },
  },
  writable: true,
});

// Define a simple Event class for DOM events
type EventOptions = {
  bubbles?: boolean;
  cancelable?: boolean;
  defaultPrevented?: boolean;
};

// Create a custom event implementation to avoid TypeScript errors
class CustomEvent {
  bubbles: boolean;
  cancelable: boolean;
  composed: boolean = true;
  currentTarget: Element | null = null;
  defaultPrevented: boolean = false;
  eventPhase: number = 0;
  isTrusted: boolean = true;
  target: Element | null = null;
  timeStamp: number = Date.now();
  type: string;
  returnValue: boolean = true;
  srcElement: Element | null = null;
  static readonly AT_TARGET: 2 = 2 as const;
  static readonly BUBBLING_PHASE: 3 = 3 as const;
  static readonly CAPTURING_PHASE: 1 = 1 as const;
  static readonly NONE: 0 = 0 as const;

  constructor(type: string, options?: EventOptions) {
    this.type = type;
    this.bubbles = options?.bubbles ?? true;
    this.cancelable = options?.cancelable ?? true;
    this.defaultPrevented = options?.defaultPrevented ?? false;
  }

  composedPath(): EventTarget[] {
    return [];
  }

  preventDefault(): void {
    if (this.cancelable) {
      // Since we're not implementing the full Event interface, we can modify defaultPrevented
      this.defaultPrevented = true;
    }
  }

  stopImmediatePropagation(): void {}
  stopPropagation(): void {}

  initEvent(type: string, bubbles?: boolean, cancelable?: boolean): void {
    this.type = type;
    if (bubbles !== undefined) this.bubbles = bubbles;
    if (cancelable !== undefined) this.cancelable = cancelable;
  }
}

// Create proper DOM elements for React Testing Library
class Element {
  nodeName: string;
  nodeType = 1;
  tagName: string;
  children: Element[] = [];
  attributes: Record<string, string> = {};
  style: Record<string, string> = {};
  lang = '';
  dir = 'ltr';
  textContent = '';
  id = '';
  className = '';
  childNodes: Element[] = [];
  parentNode: Element | null = null;
  eventListeners: Record<string, Array<(event: CustomEvent) => void>> = {};

  constructor(tagName: string) {
    this.nodeName = tagName.toUpperCase();
    this.tagName = tagName.toUpperCase();
  }

  setAttribute(name: string, value: string) {
    if (name === 'lang') this.lang = value;
    else if (name === 'dir') this.dir = value;
    else this.attributes[name] = value;
  }

  getAttribute(name: string) {
    if (name === 'lang') return this.lang;
    if (name === 'dir') return this.dir;
    return this.attributes[name] || null;
  }

  appendChild(child: Element | TextNode | Comment): Element | TextNode | Comment {
    child.parentNode = this;
    this.children.push(child as Element);
    this.childNodes.push(child as Element);
    return child;
  }

  removeChild(child: Element | TextNode | Comment): Element | TextNode | Comment {
    const index = this.children.indexOf(child as Element);
    if (index !== -1) {
      this.children.splice(index, 1);
      this.childNodes.splice(index, 1);
    }
    return child;
  }

  addEventListener(type: string, listener: (event: CustomEvent) => void): void {
    if (!this.eventListeners[type]) {
      this.eventListeners[type] = [];
    }
    this.eventListeners[type].push(listener);
  }

  removeEventListener(type: string, listener: (event: CustomEvent) => void): void {
    if (!this.eventListeners[type]) return;
    const index = this.eventListeners[type].indexOf(listener);
    if (index !== -1) {
      this.eventListeners[type].splice(index, 1);
    }
  }

  dispatchEvent(event: CustomEvent): boolean {
    const listeners = this.eventListeners[event.type] || [];
    listeners.forEach(listener => listener(event));
    return !event.defaultPrevented;
  }
}

// Define types for text and comment nodes
type TextNode = {
  text: string;
  nodeType: 3;
  parentNode: Element | null;
};

type Comment = {
  text: string;
  nodeType: 8;
  parentNode: Element | null;
};

// Setup mock for document with language properties and DOM methods
const documentElement = new Element('html');
const bodyElement = new Element('body');
const headElement = new Element('head');
documentElement.appendChild(headElement);
documentElement.appendChild(bodyElement);

Object.defineProperty(global, 'document', {
  value: {
    documentElement,
    body: bodyElement,
    head: headElement,
    createElement: (tagName: string) => new Element(tagName),
    createTextNode: (text: string) => ({
      text,
      nodeType: 3,
      parentNode: null,
    }),
    createElementNS: (_namespace: string, tagName: string) => new Element(tagName),
    createDocumentFragment: () => new Element('fragment'),
    createComment: (text: string) => ({ text, nodeType: 8 }),
    getElementById: () => null,
    querySelector: (selector: string) => {
      if (selector === 'meta[http-equiv="content-language"]') {
        return {
          setAttribute: vi.fn(),
        };
      }
      return null;
    },
  },
  writable: true,
});
