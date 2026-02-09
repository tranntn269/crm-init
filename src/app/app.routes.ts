import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { permissionGuard } from './guards/permission-guard';
import { UserRole } from './enums/user.enum';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [permissionGuard],
    data: {
      authorities: {
        roles: [UserRole.STAFF],
      },
    },
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
