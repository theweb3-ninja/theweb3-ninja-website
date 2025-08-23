import { EVEO_FEATURES } from '../config';

function getEveoFeatures(): string[] {
  return EVEO_FEATURES.split(',')
    .map((f: string) => f.trim())
    .filter(Boolean);
}

export const isFeatureEnabled = (feature: string): boolean => {
  try {
    return getEveoFeatures().includes(feature);
  } catch (error) {
    console.error('Error checking feature:', error);
    return false; // Fail gracefully
  }
};
