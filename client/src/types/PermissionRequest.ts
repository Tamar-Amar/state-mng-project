export interface PermissionRequest {
    _id?: string;
    user: string; // userId
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
  