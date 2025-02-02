import { atom, selector } from 'recoil';
import { fetchRegions } from '../services/regionService';

export const regionsAtom = atom<string[]>({
  key: 'regionsAtom',
  default: [],
});

export const regionsSelector = selector({
  key: 'regionsSelector',
  get: async () => {
    try {
      const regions = await fetchRegions();
      return regions.map(region => region.nameRegion);
    } catch (error) {
      console.error('Failed to fetch regions:', error);
      return [];
    }
  }
});
