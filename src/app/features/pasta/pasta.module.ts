import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PastasListComponent } from './components/pastas-list/pastas-list.component';
import { PastaDetailsComponent } from './components/pasta-details/pasta-details.component';
import { FormsModule } from '@angular/forms';
import { PastaRoutingModule } from './pasta-routing.module';
import { PastaService } from './services/pasta.service';



@NgModule({
  declarations: [
    PastasListComponent,
    PastaDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PastaRoutingModule
  ],
  providers:[{provide:PastaService, useClass:PastaService}]
})
export class PastaModule { }
