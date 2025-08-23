import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { isServer } from '../config';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertRemToPixel(value: string) {
  return Number(value.trim().replace('rem', '')) * 16;
}

export const getAppVersion = () => {
  return isServer
    ? 'server'
    : (window as unknown as { __reactRouterManifest?: { version: string } }).__reactRouterManifest?.version.substring(
        0,
        8
      );
};

export const getShortEnv = (env: string) => {
  return (
    env === 'development' ? 'dev' : env === 'production' ? 'prod' : env === 'staging' ? 'staging' : env
  ).toUpperCase();
};
