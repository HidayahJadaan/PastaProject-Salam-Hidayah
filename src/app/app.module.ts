import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './features/shared/shared.module';
import { MainHomeLayoutComponent } from './components/main-home-layout/main-home-layout.component';
import { MainNavbarComponent } from './components/main-navbar/main-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    MainHomeLayoutComponent,
    MainNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
