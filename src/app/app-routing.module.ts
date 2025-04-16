import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },

  {
    path: 'chef',
    loadChildren: () =>
      import('./features/chef/chef.module').then((m) => m.ChefModule),
    canActivate: [AuthGuard],
    data: { role: 'chef' },
  },

  {
    path: 'customer',
    loadChildren: () =>
      import('./features/customer/customer.module').then(
        (m) => m.CustomerModule
      ),
    canActivate: [AuthGuard],
    data: { role: 'customer' },
  },

  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
