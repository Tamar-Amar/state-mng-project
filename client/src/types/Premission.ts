export interface Permission {
    _id?: string;
    user: string; // userId
    canAdd: boolean;
    canUpdate: boolean;
    canDelete: boolean;
  }
  