export interface PermissionRequest {
    _id?: string;
    userId: string;
    requestedPermissions: {
      canAdd: boolean;
      canUpdate: boolean;
      canDelete: boolean;
    };
    status: 'pending' | 'approved' | 'denied';
    reviewedBy?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface PermissionRequestFromServer {
    _id?: string;
    user:{
      _id: string;
      username: string;
      email: string;
    }
    requestedPermissions: {
      canAdd: boolean;
      canUpdate: boolean;
      canDelete: boolean;
    };
    status: 'pending' | 'approved' | 'denied';
    reviewedBy?:{
      _id: string;
      username: string;
    }
    createdAt: Date;
    updatedAt: Date;
  }