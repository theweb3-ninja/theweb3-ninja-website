import { FEATURES } from '../config';

function getFeatures(): string[] {
  return FEATURES.split(',')
    .map((f: string) => f.trim())
    .filter(Boolean);
}

export const isFeatureEnabled = (feature: string): boolean => {
  try {
    return getFeatures().includes(feature);
  } catch (error) {
    console.error('Error checking feature:', error);
    return false; // Fail gracefully
  }
};
