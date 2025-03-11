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

  if (
    !currentPermissions.canAdd &&
    !existingRequests.some((req) => {
      if (!req.requestedPermissions?.canAdd) return false;
      if (req.status !== 'denied') return true;
      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      return Date.now() - new Date(req.updatedAt).getTime() < oneWeek;
    })
  ) {
    options.push('add');
  }

  if (
    !currentPermissions.canUpdate &&
    !existingRequests.some((req) => {
      if (!req.requestedPermissions?.canUpdate) return false;
      if (req.status !== 'denied') return true;
      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      return Date.now() - new Date(req.updatedAt).getTime() < oneWeek;
    })
  ) {
    options.push('update');
  }

if (
  !currentPermissions.canDelete &&
  !existingRequests.some((req) => {
    if (!req.requestedPermissions?.canDelete) return false;
    if (req.status !== 'denied') return true;
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    return Date.now() - new Date(req.updatedAt).getTime() < oneWeek;
  })
) {
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
