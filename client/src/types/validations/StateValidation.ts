import { useQueryClient } from '@tanstack/react-query';
import * as yup from 'yup';
import { useRegions } from '../../hooks/useRegions';
import VALID_MSG from '../../constants/validationTxt';

export const stateEditValidationSchema = () => {
  const { data: regions = [] } = useRegions();
  
  return yup.object().shape({
    flag: yup.string().url(VALID_MSG.FLAG_URL)
    .required(VALID_MSG.REQUIRED_MSG('flag')),
    population: yup.number().min(0, VALID_MSG.POPULATION_MIN)
    .required(VALID_MSG.REQUIRED_MSG('population')),
    region: yup.string()
      .test('isValidRegion', VALID_MSG.REGION_INVALID, 
        (value) => !value || regions.includes(value)
      )
      .required(VALID_MSG.REQUIRED_MSG('region')),
  });
};

export const stateCreateValidationSchema = () => {
  const { data: regions = [] } = useRegions();
  return yup.object().shape({
    name: yup.string()
      .min(3, VALID_MSG.NAME_MIN)
      .matches(/^[\p{L}\s\-]+$/u, VALID_MSG.NAME_MATCH)
      .required(VALID_MSG.REQUIRED_MSG('name'))
      .max(30, VALID_MSG.NAME_MAX),
    isActive: yup.boolean(),
    flag: yup.string().url(VALID_MSG.FLAG_URL)
    .required(VALID_MSG.REQUIRED_MSG('flag')),
    population: yup.number().min(0, VALID_MSG.POPULATION_MIN)
    .required(VALID_MSG.REQUIRED_MSG('population')),
    region: yup.string()
      .test('isValidRegion', VALID_MSG.REGION_INVALID, 
        (value) => !value || regions.includes(value)
      )
      .required(VALID_MSG.REQUIRED_MSG('region'))
      .notOneOf(['000'], VALID_MSG.REGION_NOT_EMPTY),
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
