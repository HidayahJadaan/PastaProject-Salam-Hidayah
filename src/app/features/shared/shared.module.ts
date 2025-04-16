import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { AuthFooterComponent } from './components/auth-footer/auth-footer.component';
import { RouterModule } from '@angular/router';
import { CapitlizePipe } from './pipes/capitlize.pipe';
import { HidePasswordPipe } from './pipes/hide-password.pipe';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from './services/auth-service.service';

const layoutComponents = [AuthHeaderComponent, AuthFooterComponent];

@NgModule({
  declarations: [
    AuthLayoutComponent,
    AuthHeaderComponent,
    AuthFooterComponent,
    CapitlizePipe,
    HidePasswordPipe,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [AuthLayoutComponent, CapitlizePipe, HidePasswordPipe, FormsModule, ...layoutComponents],
  providers: [{ provide: AuthServiceService, useClass: AuthServiceService }],
})
export class SharedModule {}
