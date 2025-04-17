import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BranchesService } from '../../services/branches.service';
import { Branch } from '../../models/branch.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-branch-form',
 standalone: true,
  imports: [FormsModule, RouterModule,CommonModule],
  templateUrl: './branch-form.component.html',
  styleUrl: './branch-form.component.scss',
})
export class BranchFormComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private branchesService: BranchesService
  ) {}

  id: string | null = null;
  Bname: string = '';
  location: string = '';

  branchId: string = '';
  loading: boolean = false;
  errors: string[] = [];
  success: string = '';
  loadingforGet: boolean = false;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.loadingforGet = true;
      this.branchesService
        .getBranches(this.id)
        .then((b: Branch) => {
          this.loadingforGet = false;
          this.id = b.id;
          this.Bname = b.name;
          this.location = b.location;
        })
        .catch((erorr: string) => {
          this.loadingforGet = false;
          this.errors.push(erorr);
        });
    }
  } // END ONINT

  branchSave(): void {
    this.loading = false;
    this.errors.length = 0; //reset data
    if (this.Bname.trim() && this.location.trim()) {
      //send data
      const branch: any = {
        id: '' + Math.random(),
        name: this.Bname,
        location: this.location,
      };
      this.loading = true;
      if (this.id) {
        branch.id = this.id;
        this.branchesService
          .updateBranch(branch)
          .then((branch: Branch) => {
            (this.loading = false),
              (this.success = 'Branch updated successfully');
          })
          .catch((error: string) => {
            (this.loading = false), this.errors.push(error);
          });
      } else {
        this.branchesService.addBranch(branch).then((branch: Branch) => {
          (this.loading = false), (this.success = 'Branch added successfully');
        });

       
      }
    } else {
      this.errors.push(
        ...this.branchesService.validateBranchForm(this.Bname, this.location)
      );
    }
  }
}
