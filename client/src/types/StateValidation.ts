import { useRecoilState } from 'recoil';
import { regionsAtom } from '../store/regionsAtoms';
import * as yup from 'yup';

export const stateEditValidationSchema = (regions: string[]) =>
  yup.object().shape({
    flag: yup
      .string()
      .url('Flag must be a valid URL')
      .required('Flag is required'),
    population: yup
      .number()
      .min(0, 'Population cannot be less than 0')
      .required('Population is required'),
    region: yup
      .string()
      .test(
        'isValidRegion',
        'Region must be one of the predefined options or a newly added one',
        (value) => !value || regions.includes(value)
      )
      .required('Region is required'),
  });

  export const stateCreateValidationSchema = (regions: string[]) =>
    yup.object().shape({
      name: yup
       .string()
       .required('Name is required'),
       isActive:yup.boolean(),
      flag: yup
        .string()
        .url('Flag must be a valid URL')
        .required('Flag is required'),
      population: yup
        .number()
        .min(0, 'Population cannot be less than 0')
        .required('Population is required'),
      region: yup
        .string()
        .test(
          'isValidRegion',
          'Region must be one of the predefined options or a newly added one',
          (value) => !value || regions.includes(value)
        )
        .required('Region is required')
        .notOneOf(['000'], 'Region cannot be empty'),
    });

export const useDynamicRegions = () => {
  const [regions, setRegions] = useRecoilState(regionsAtom);

  const addRegion = (newRegion: string) => {
    if (!regions.includes(newRegion)) {
      setRegions([...regions, newRegion]);
    }
  };

  return { regions, addRegion };
};
