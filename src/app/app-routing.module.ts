import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { AuthLayoutComponent } from './features/shared/components/auth-layout/auth-layout.component';
import { MainHomeLayoutComponent } from './components/main-home-layout/main-home-layout.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { ContactUsComponent } from './components/pages/contact-us/contact-us.component';
import { MainMenuComponent } from './components/pages/main-menu/main-menu.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },

  {
    path: 'auth',
    component: MainHomeLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'admin',
    component: MainHomeLayoutComponent,

    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },

  {
    path: 'chef',
    component: MainHomeLayoutComponent,

    loadChildren: () =>
      import('./features/chef/chef.module').then((m) => m.ChefModule),
    canActivate: [AuthGuard],
    data: { role: 'chef' },
  },

  {
    path: 'customer',
    component: MainHomeLayoutComponent,
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
      { path: '', component: HomePageComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'main-menu', component: MainMenuComponent },
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
