import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../components/pages/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, LoginComponent, AuthRoutingModule],
})
export class AuthModule {}
