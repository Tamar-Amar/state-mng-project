// src/hooks/usePermissions.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
  return useMutation({
    mutationFn: getPendingRequests,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['permissionRequests'] }),
  });
};

export const useCreateRequestPermission = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (permissions: { canAdd: boolean; canUpdate: boolean; canDelete: boolean }) =>
      requestPermission(permissions),

    onSuccess: (newRequest: PermissionRequestFromServer) => {
      queryClient.setQueryData<PermissionRequestFromServer[]>(
        ['userPermissionRequests', userId],
        (oldData = []) => [...oldData, newRequest]
      );

      queryClient.setQueryData<PermissionRequestFromServer[]>(
        ['pendingPermissionRequests'],
        (oldData = []) => [...oldData, newRequest]
      );

    },
  });
};




export const useUserPermissionRequests = (userId: string) => {
  return useQuery<PermissionRequestFromServer[]>({
    queryKey: ['userPermissionRequests', userId],
    queryFn: () => getUserPermissionRequests(userId),
    enabled: Boolean(userId),
    staleTime: 1000 * 60, 
    refetchOnWindowFocus: true,
  });
};

  export const useFilteredUserRequests = (userId: string) => {
    const queryClient = useQueryClient();
    const pendingRequests = queryClient.getQueryData<PermissionRequestFromServer[]>(['pendingPermissionRequests']) || [];
    return pendingRequests.filter(request => request.user._id === userId);
  };

export const usePendingRequests = () =>
  useQuery<PermissionRequestFromServer[]>({
    queryKey: ['pendingPermissionRequests'],
    queryFn: () => getPendingRequests(),
  });

  export const useApprovePermission = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, approvals }: { id: string; approvals: { canAdd?: boolean; canUpdate?: boolean; canDelete?: boolean } }) => 
        approvePermissionRequest( id, approvals),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pendingPermissionRequests'] }),
    });
  };

export const useDenyPermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: denyPermissionRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pendingPermissionRequests'] }),
  });
};
