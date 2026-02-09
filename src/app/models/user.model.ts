import { UserDepartment, UserRole } from '../enums/user.enum';

export interface User {
  username: string;
  roles: string[];
  departments: string[];
}

export interface UserPermission {
  roles?: UserRole[];
  departments?: UserDepartment[];
}
