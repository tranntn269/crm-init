export interface User {
  username: string;
  roles: string[];
  departments: string[];
  permissions: string[];
}

export interface UserPermission {
  roles?: string[];
  departments?: string[];
  permissions?: string[];
}
