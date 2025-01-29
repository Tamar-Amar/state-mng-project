import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchStates, addState, deleteState, updateState } from '../services/stateService';
import { State } from '../types/State';
import axios from 'axios';


export const useStates = () => {
  return useQuery('states', fetchStates);
};

export const useAddState = () => {
  const queryClient = useQueryClient();
  return useMutation(addState, {
    onSuccess: (newState) => {
      queryClient.setQueryData('states', (oldStates: State[] | undefined) => {
        return oldStates ? [...oldStates, newState] : [newState];
      });
    },
  });
};

export const useDeleteState = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteState, {
    onSuccess: (deletedStateId) => {
      queryClient.setQueryData('states', (oldStates: State[] | undefined) => {
        return oldStates ? oldStates.filter((state) => state._id !== deletedStateId) : [];
      });
    },
  });
};


export const useUpdateState = () => {
  const queryClient = useQueryClient();
  return useMutation(updateState, {
    onSuccess: (updatedState) => {
      queryClient.setQueryData('states', (oldStates: State[] | undefined) => {
        return oldStates
          ? oldStates.map((state) =>
              state._id === updatedState._id ? updatedState : state
            )
          : [];
      });
    },
  });
};

export  const useRestoreState = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => {
      const response = await axios.patch(`http://localhost:5000/api/states/${id}/restore`);
      return response.data;
    },
    {
      onSuccess: (restoredState) => {
        queryClient.setQueryData('states', (oldStates: State[] | undefined) => {
          return oldStates
            ? oldStates.map((state) =>
                state._id === restoredState._id ? restoredState : state
              )
            : [restoredState];
        });
      },
    }
  );
};