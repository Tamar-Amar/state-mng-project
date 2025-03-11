import { useQueryClient } from '@tanstack/react-query';
import * as yup from 'yup';
import { useRegions } from '../../hooks/useRegions';
import { VALID_MSG } from '../../constants/componentsTxt';

export const stateEditValidationSchema = () => {
  const { data: regions = [] } = useRegions();
  return yup.object().shape({
    flag: yup.string().url(VALID_MSG.flagUrl)
    .required(VALID_MSG.requiredFiled('flag')),
    population: yup.number().min(0, VALID_MSG.populationMin)
    .required(VALID_MSG.requiredFiled('population')),
    region: yup.string()
      .test('isValidRegion', VALID_MSG.regionExists, 
        (value) => !value || regions.includes(value)
      )
      .required(VALID_MSG.requiredFiled('region')),
  });
};

export const stateCreateValidationSchema = () => {
  const { data: regions = [] } = useRegions();
  return yup.object().shape({
    name: yup.string()
      .min(3, VALID_MSG.nameMin)
      .matches(/^[\p{L}\s\-]+$/u, VALID_MSG.nameContain)
      .required(VALID_MSG.requiredFiled('name'))
      .max(30, VALID_MSG.nameMax),
    isActive: yup.boolean(),
    flag: yup.string().url(VALID_MSG.flagUrl)
    .required(VALID_MSG.requiredFiled('flag')),
    population: yup.number().min(0, VALID_MSG.populationMin)
    .required(VALID_MSG.requiredFiled('population')),
    region: yup.string()
      .test('isValidRegion', VALID_MSG.regionExists, 
        (value) => !value || regions.includes(value)
      )
      .required(VALID_MSG.requiredFiled('region'))
      .notOneOf(['000'], VALID_MSG.requiredFiled('region')),
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
