// src/hooks/usePermissions.ts
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  requestPermission,
  getPendingRequests,
  approvePermissionRequest,
  denyPermissionRequest,
  getUserPermissionRequests,
} from '../services/permissionRequestsService';
import { PermissionRequest, PermissionRequestFromServer } from '../types';

export const useRequestPermission = () => {
  const queryClient = useQueryClient();
  return useMutation(getPendingRequests, {
    onSuccess: () => queryClient.invalidateQueries('permissionRequests'),
  });
};

export const useCreateRequestPermission = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (permissions: { canAdd: boolean; canUpdate: boolean; canDelete: boolean }) =>
      requestPermission(permissions),
    {
      onSuccess: (newRequest: PermissionRequestFromServer) => {
        queryClient.setQueryData<PermissionRequestFromServer[]>('permissionRequests', (oldData) => {
          return oldData ? [newRequest, ...oldData] : [newRequest];
        });
        queryClient.setQueryData<PermissionRequestFromServer[]>(
          ['userPermissionRequests', newRequest.user._id as string],
          (oldData) =>
            oldData ? [newRequest as PermissionRequestFromServer, ...oldData] : [newRequest as PermissionRequestFromServer]
        );
      }
    }
  );
};


export const useUserPermissionRequests = (userId: string) =>
  useQuery<PermissionRequestFromServer[]>(
    ['userPermissionRequests', userId],
    () => getUserPermissionRequests(userId),
    { enabled: Boolean(userId) }
  );

  export const usePendingRequests = (userId: string) =>
    useQuery<PermissionRequestFromServer[]>(
      ['permissionRequests', userId],
      () => getPendingRequests(userId)
    );

export const useApprovePermission = () => {
  const queryClient = useQueryClient();
  return useMutation(approvePermissionRequest, {
    onSuccess: () => queryClient.invalidateQueries('permissionRequests'),
  });
};

export const useDenyPermission = () => {
  const queryClient = useQueryClient();
  return useMutation(denyPermissionRequest, {
    onSuccess: () => queryClient.invalidateQueries('permissionRequests'),
  });
};
