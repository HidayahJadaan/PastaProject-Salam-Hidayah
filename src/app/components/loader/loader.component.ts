import { Component, DoCheck } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: false,
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent implements DoCheck{
  isVisible = false;

  constructor(private loaderService: LoaderService) {}

  ngDoCheck() {
    this.isVisible = this.loaderService.isLoading;
  }

}
