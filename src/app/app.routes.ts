import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { permissionGuard } from './guards/permission-guard';
import { UserRole } from './enums/user.enum';
import { Authen } from './guards/authen';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [Authen],
    data: {
      authorities: {
        roles: [UserRole.STAFF], // Required roles
      },
    },
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  //   {
  //     path: 'dashboard',
  //     component: Dashboard,
  //     canActivate: [permissionGuard],
  //     data: {
  //       authorities: {
  //         roles: [UserRole.STAFF], // Required roles
  //       },
  //     },
  //   },
];
