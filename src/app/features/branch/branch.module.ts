import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchesService } from './services/branches.service';
import { BranchFormComponent } from './components/branch-form/branch-form.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BranchesRoutingModule } from './branch-routing.module';



@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    BranchesRoutingModule,
    RouterModule
 
  ],
  
  providers:[{provide:BranchesService, useClass:BranchesService}]
})
export class BranchModule { }
