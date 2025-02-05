// src/hooks/usePermissions.ts
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  requestPermission,
  getPendingRequests,
  approvePermissionRequest,
  denyPermissionRequest,
} from '../services/permissionRequestsService';
import { PermissionRequest, PermissionRequestFromServer } from '../types';

export const useRequestPermission = () => {
  const queryClient = useQueryClient();
  return useMutation(getPendingRequests, {
    onSuccess: () => queryClient.invalidateQueries('permissionRequests'),
  });
};

export const usePendingRequests = () =>
  useQuery<PermissionRequestFromServer[]>('permissionRequests', getPendingRequests);

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
