import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './features/shared/shared.module';
import { MainHomeLayoutComponent } from './components/main-home-layout/main-home-layout.component';
import { MainNavbarComponent } from './components/main-navbar/main-navbar.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { ContactUsComponent } from './components/pages/contact-us/contact-us.component';
import { MainMenuComponent } from './components/pages/main-menu/main-menu.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { LoaderComponent } from './components/loader/loader.component';
// import { ChefsFormComponent } from './features/chef/components/chefs-form/chefs-form.component';
// import { IngredientFormComponent } from './features/ingredient/components/ingredient-form/ingredient-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    AppComponent,
    MainHomeLayoutComponent,
    MainNavbarComponent,
    AboutUsComponent,
    ContactUsComponent,
    MainMenuComponent,
    // HomePageComponent,
    LoaderComponent,
    // ChefsFormComponent,
    // IngredientFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    CommonModule,
    RouterModule,
    
    
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
