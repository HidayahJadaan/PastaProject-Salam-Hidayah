import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PastasListComponent } from './components/pastas-list/pastas-list.component';
import { PastaDetailsComponent } from './components/pasta-details/pasta-details.component';



@NgModule({
  declarations: [
    PastasListComponent,
    PastaDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PastaModule { }
