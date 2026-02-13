export interface User {
  username: string;
  roles: string[];
  departments: string[];
  permissions: string[];
  clientName?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
  email?: string;
  dob?: string;
}

export interface UserPermission {
  roles?: string[];
  departments?: string[];
  permissions?: string[];
}
