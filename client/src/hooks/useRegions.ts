import { useRecoilState } from 'recoil';
import { useQuery, useMutation } from 'react-query';
import { regionsAtom } from '../store/regionsAtoms';
import axios from 'axios';
import { api } from '../services/apiService';


export const fetchRegions = async (): Promise<{ nameRegion: string }[]> => {
    const response = await api.get("/regions");
    return response.data;
  };


export const createRegion = async (regionName: string): Promise<string> => {
  const response = await api.post("/regions", { nameRegion: regionName });
  return response.data;
};


export const useRegionsWithRecoil = () => {
    const [regions, setRegions] = useRecoilState(regionsAtom);
  
    const { isLoading, isError } = useQuery('regions', fetchRegions, {
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
