// src/utils/permissionRequestUtils.ts
export type PermissionOption = 'add' | 'update' | 'delete' | 'all';

export interface CurrentPermissions {
  canAdd: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

export interface RequestedPermissions {
  canAdd: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}


export function getAvailablePermissionOptions(
  currentPermissions: CurrentPermissions,
  existingRequests: any[] = []
): PermissionOption[] {
  const options: PermissionOption[] = [];

  if (!currentPermissions.canAdd && !existingRequests.some(req => req.requestedPermissions?.canAdd)) {
    options.push('add');
  }
  if (!currentPermissions.canUpdate && !existingRequests.some(req => req.requestedPermissions?.canUpdate)) {
    options.push('update');
  }
  if (!currentPermissions.canDelete && !existingRequests.some(req => req.requestedPermissions?.canDelete)) {
    options.push('delete');
  }
  if (options.length === 3) {
    options.push('all');
  }
  return options;
}



export function buildPermissionsObject(option: PermissionOption): RequestedPermissions {
  switch (option) {
    case 'add':
      return { canAdd: true, canUpdate: false, canDelete: false };
    case 'update':
      return { canAdd: false, canUpdate: true, canDelete: false };
    case 'delete':
      return { canAdd: false, canUpdate: false, canDelete: true };
    case 'all':
      return { canAdd: true, canUpdate: true, canDelete: true };
    default:
      return { canAdd: false, canUpdate: false, canDelete: false };
  }
}
