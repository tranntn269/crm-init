import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { UserDepartment, UserRole } from './enums/user.enum';
import { canMatchPermissionGuard } from './guards/can-match-permission-guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard,
    canMatch: [canMatchPermissionGuard],
    data: {
      authorities: {
        roles: [UserRole.STAFF],
        permissions: ['CREATE'],
        departments: [UserDepartment.TECH],
      },
    },
  },
  // {
  //   path: 'table',
  //   loadComponent: () => import('./shared/components/table/table').then((m) => m.Table),
  // },
  {
    path: 'client-management',
    loadComponent: () =>
      import('./components/client-management/client-management').then((m) => m.ClientManagement),
  },
  {
    path: '',
    redirectTo: 'client-management',
    pathMatch: 'full',
  },
];
