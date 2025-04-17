import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchesService } from './services/branches.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[{provide:BranchesService, useClass:BranchesService}]
})
export class BranchModule { }
