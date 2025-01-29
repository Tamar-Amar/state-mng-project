import { useRecoilState } from 'recoil';
import { useQuery, useMutation } from 'react-query';
import { regionsAtom } from '../store/regionsAtoms';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/regions';


export const fetchRegions = async (): Promise<{ nameRegion: string }[]> => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  };


export const createRegion = async (regionName: string): Promise<string> => {
  const response = await axios.post(API_BASE_URL, { nameRegion: regionName });
  return response.data;
};


export const useRegionsWithRecoil = () => {
    const [regions, setRegions] = useRecoilState(regionsAtom);
  
    const { data, isLoading, isError } = useQuery('regions', fetchRegions, {
      onSuccess: (data) => {
        const regionNames = data.map((region: { nameRegion: string }) => region.nameRegion);
        setRegions(regionNames);
      },
    });
  
    return { regions, isLoading, isError };
  };
  

export const useCreateRegionWithRecoil = () => {
  const [regions, setRegions] = useRecoilState(regionsAtom);
  return useMutation(createRegion, {
    onSuccess: (newRegion) => {
      setRegions((prevRegions) => [...prevRegions, newRegion]); 
    },
  });
};
