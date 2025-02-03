// src/hooks/useStates.ts
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  fetchStates,
  addState,
  deleteState,
  updateState,
  restoreState,
} from '../services/stateService';
import { State, AddStateResponse } from '../types';

export const useStates = () => useQuery<State[]>('states', fetchStates);

export const useAddState = () => {
  const queryClient = useQueryClient();
  return useMutation<AddStateResponse, unknown, State>(addState, {
    onSuccess: (data) => {
      if (data.state) {
        queryClient.setQueryData<State[]>('states', (oldStates) =>
          oldStates ? [...oldStates, data.state!] : [data.state!]
        );
      }
    },
  });
};

export const useDeleteState = () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => deleteState(id), {
    onSuccess: (_, deletedStateId) => {
      queryClient.setQueryData<State[]>('states', (oldStates) =>
        oldStates ? oldStates.filter((state) => state._id !== deletedStateId) : []
      );
    },
  });
};

export const useUpdateState = () => {
  const queryClient = useQueryClient();
  return useMutation((updatedState: State) => updateState(updatedState._id!, updatedState), {
    onSuccess: (updatedState) => {
      queryClient.setQueryData<State[]>('states', (oldStates) =>
        oldStates
          ? oldStates.map((state) =>
              state._id === updatedState._id ? updatedState : state
            )
          : [updatedState]
      );
    },
  });
};

export const useRestoreState = () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => restoreState(id), {
    onSuccess: (restoredState) => {
      queryClient.setQueryData<State[]>('states', (oldStates) =>
        oldStates
          ? oldStates.map((state) =>
              state._id === restoredState._id ? restoredState : state
            )
          : [restoredState]
      );
    },
  });
};