// src/hooks/useRegions.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/apiService';
import { Region } from '../types';

export const fetchRegions = async (): Promise<{ nameRegion: string }[]> => {
  const response = await api.get("/regions");
  return response.data;
};

export const createRegion = async (regionName: string): Promise<string> => {
  const response = await api.post("/regions", { nameRegion: regionName });
  return response.data;
};


export const useRegions = () =>
  useQuery<Region[], Error, string[]>({
    queryKey: ['regions'],
    queryFn: fetchRegions,
    select: (data) => data.map((region) => region.nameRegion),
    placeholderData: [],
  });


  export const useCreateRegion = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: createRegion,
      onSuccess: (newRegion: string) => {
        queryClient.setQueryData<string[]>(['regions'], (oldRegions = []) => {
          return [...oldRegions, newRegion];
        });
      },
    });
  };
