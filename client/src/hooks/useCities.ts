import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { City } from '../types/City';
import { State } from '../types';
import { api } from "../services/apiService";

const fetchCities = async (): Promise<City[]> => {
  const { data } = await api.get('/cities'); 
  return data;
};

const addCity = async (cityData: { cityName: string; stateId: string }) => {
  const { data } = await api.post('/cities/add', cityData);
  return data;
};

const deleteCity = async (cityId: string) => {
  await api.delete(`/cities/delete/${cityId}`);
};

export const useCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities,
  });
};

export const useAddCity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCity,
    onSuccess: (newCity: City) => {
      queryClient.setQueryData<City[]>(['cities'], (oldCities = []) => [...oldCities, newCity]);

      queryClient.setQueryData<State[]>(['states'], (oldStates = []) =>
        oldStates.map((state): State =>  
          state._id === newCity.stateId
            ? {
                ...state,
                cities: [...(state.cities ?? []) , newCity],
              }
            : state
        )
      );
    },
  });
};


export const useDeleteCity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCity,
    onSuccess: (_, deletedCityId: string) => {
      queryClient.setQueryData<City[]>(['cities'], (oldCities = []) =>
        oldCities.filter((city) => city._id !== deletedCityId)
      );

      queryClient.setQueryData<State[]>(['states'], (oldStates = []) =>
        oldStates.map((state) => ({
          ...state,
          cities: state.cities?.filter((city) => city._id !== deletedCityId),
        }))
      );
    },
  });
};
