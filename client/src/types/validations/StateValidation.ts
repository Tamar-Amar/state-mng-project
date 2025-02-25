import { useQueryClient } from '@tanstack/react-query';
import * as yup from 'yup';
import { useRegions } from '../../hooks/useRegions';


export const stateEditValidationSchema = () => {
  const { data: regions = [] } = useRegions();
  
  return yup.object().shape({
    flag: yup.string().url('Flag must be a valid URL').required('Flag is required'),
    population: yup.number().min(0, 'Population cannot be less than 0').required('Population is required'),
    region: yup.string()
      .test('isValidRegion', 'Region must be one of the predefined options or a newly added one', 
        (value) => !value || regions.includes(value)
      )
      .required('Region is required'),
  });
};

export const stateCreateValidationSchema = () => {
  const { data: regions = [] } = useRegions();
  return yup.object().shape({
    name: yup.string()
      .min(3, 'Name must be at least 3 characters long')
      .matches(/^[\p{L}\s\-]+$/u, 'Name can only contain letters from any language, spaces, and hyphens')
      .required('Name is required')
      .max(30, 'Name must not exceed 30 characters'),
    isActive: yup.boolean(),
    flag: yup.string().url('Flag must be a valid URL').required('Flag is required'),
    population: yup.number().min(0, 'Population cannot be less than 0').required('Population is required'),
    region: yup.string()
      .test('isValidRegion', 'Region must be one of the predefined options or a newly added one', 
        (value) => !value || regions.includes(value)
      )
      .required('Region is required')
      .notOneOf(['000'], 'Region cannot be empty'),
  });
};


export const useDynamicRegions = () => {
  const { data: regions = [] } = useRegions();
  const queryClient = useQueryClient();

  const addRegion = (newRegion: string) => {
    queryClient.setQueryData<string[]>(['regions'], (oldRegions = []) => {
      if (!oldRegions.includes(newRegion)) {
        return [...oldRegions, newRegion];
      }
      return oldRegions;
    });
  };

  return { regions, addRegion };
};
    
