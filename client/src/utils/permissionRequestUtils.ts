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

/**
 * מחשבת את האפשרויות הזמינות לשליחת בקשה על סמך ההרשאות הקיימות 
 * והבקשות הקיימות במצב pending.
 * @param currentPermissions - ההרשאות הקיימות של המשתמש.
 * @param existingRequests - מערך הבקשות הקיימות (לדוגמה, מההוק useUserPermissionRequests).
 * @returns מערך אפשרויות (PermissionOption) שהמשתמש יכול לבחור.
 */
export function getAvailablePermissionOptions(
  currentPermissions: CurrentPermissions,
  existingRequests: any[] = [] // ניתן להחליף ב- PermissionRequestFromServer[] במידה ויש לך טיפוס מדויק
): PermissionOption[] {
  const options: PermissionOption[] = [];

  if (
    !currentPermissions.canAdd &&
    !existingRequests.some(
      (req) => req.status === 'pending' && req.requestedPermissions?.canAdd
    )
  ) {
    options.push('add');
  }
  if (
    !currentPermissions.canUpdate &&
    !existingRequests.some(
      (req) => req.status === 'pending' && req.requestedPermissions?.canUpdate
    )
  ) {
    options.push('update');
  }
  if (
    !currentPermissions.canDelete &&
    !existingRequests.some(
      (req) => req.status === 'pending' && req.requestedPermissions?.canDelete
    )
  ) {
    options.push('delete');
  }
  // אפשרות "all" תופיע רק אם כל שלושת האפשרויות זמינות (כלומר, המשתמש אין לו אף אחת מהרשאות ולא קיימת בקשה ממתינה עבורן)
  if (options.length === 3) {
    options.push('all');
  }
  return options;
}

/**
 * בונה אובייקט הרשאות בהתאם לאפשרות הנבחרת.
 * @param option - האפשרות שנבחרה.
 * @returns האובייקט עם הערכים המתאימים.
 */
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
