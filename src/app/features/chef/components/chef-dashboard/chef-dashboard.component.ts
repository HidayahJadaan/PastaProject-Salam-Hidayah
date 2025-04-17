import { Component, OnInit } from '@angular/core';
import { ChefService } from '../../services/chef.service';

@Component({
  selector: 'app-chef-dashboard',
  standalone: false,
  templateUrl: './chef-dashboard.component.html',
  styleUrl: './chef-dashboard.component.scss'
})
export class ChefDashboardComponent implements OnInit{
  constructor(private chefsServics:ChefService){}
  ngOnInit(): void {
    
    this.chefsServics.fillData();
  }

}
