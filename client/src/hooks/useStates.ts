// src/hooks/useStates.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  fetchStates,
  addState,
  deleteState,
  updateState,
  restoreState,
} from '../services/stateService';
import { State, AddStateResponse } from '../types';

export const useStates = () =>
  useQuery<State[]>({
    queryKey: ['states'],
    queryFn: fetchStates,
  });

export const useAddState = () => {
  const queryClient = useQueryClient();
  return useMutation<AddStateResponse, unknown, State>({
    mutationFn: addState,
    onSuccess: (data: AddStateResponse) => {
      if (data.state) {
        queryClient.setQueryData<State[]>(['states'], (oldStates) =>
          oldStates ? [...oldStates, data.state!] : [data.state!]
        );
      }
    },
  });
};

export const useDeleteState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteState(id),
    onSuccess: (_, deletedStateId: string) => {
      queryClient.setQueryData<State[]>(['states'], (oldStates) =>
        oldStates ? oldStates.filter((state) => state._id !== deletedStateId) : []
      );
    },
  });
};

export const useUpdateState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedState: State) =>
      updateState(updatedState._id!, updatedState),
    onSuccess: (updatedState: State) => {
      queryClient.setQueryData<State[]>(['states'], (oldStates) =>
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
  return useMutation({
    mutationFn: (id: string) => restoreState(id),
    onSuccess: (restoredState: State) => {
      queryClient.setQueryData<State[]>(['states'], (oldStates) =>
        oldStates
          ? oldStates.map((state) =>
              state._id === restoredState._id ? restoredState : state
            )
          : [restoredState]
      );
    },
  });
};
