import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { AuthLayoutComponent } from './features/shared/components/auth-layout/auth-layout.component';
import { MainHomeLayoutComponent } from './components/main-home-layout/main-home-layout.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { ContactUsComponent } from './components/pages/contact-us/contact-us.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  {
    path: 'auth',
    component: MainHomeLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'admin',
    component: AuthLayoutComponent,

    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },

  {
    path: 'chef',
    component: AuthLayoutComponent,

    loadChildren: () =>
      import('./features/chef/chef.module').then((m) => m.ChefModule),
    canActivate: [AuthGuard],
    data: { role: 'chef' },
  },

  {
    path: 'customer',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./features/customer/customer.module').then(
        (m) => m.CustomerModule
      ),
    canActivate: [AuthGuard],
    data: { role: 'customer' },
  },
  {
    path: '',
    component: MainHomeLayoutComponent, 
    children: [
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact-us', component: ContactUsComponent },
    ],
  },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
