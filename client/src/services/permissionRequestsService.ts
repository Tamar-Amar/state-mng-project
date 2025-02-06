import { PermissionRequest, PermissionRequestFromServer } from "../types";
import { api } from "./apiService";

export const requestPermission = async (permission: PermissionRequest): Promise<PermissionRequest> => {
    const response = await api.post('/permission-requests', permission);
    return response.data;
  };
  
  export const getPendingRequests = async (): Promise<PermissionRequestFromServer[]> => {
    const response = await api.get('/permission-requests/pending');
    return response.data;0
  };

  export const getUserPermissionRequests = async (id: string): Promise<PermissionRequestFromServer[]> => {
    const response = await api.get(`/permission-requests/user/history/${id}`);
    return response.data;
  };
  
  
  export const approvePermissionRequest = async (id: string): Promise<PermissionRequest> => {
    const response = await api.patch(`/permission-requests/${id}/approve`);
    return response.data;
  };
  
  export const denyPermissionRequest = async (id: string): Promise<PermissionRequest> => {
    const response = await api.patch(`/permission-requests/${id}/deny`);
    return response.data;
  };