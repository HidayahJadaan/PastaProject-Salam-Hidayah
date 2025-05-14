import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LoaderComponent } from './components/loader/loader.component';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.show();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        // delay hiding for smoother transition
        setTimeout(() => {
          this.loaderService.hide();
        }, 3000);
      }
    });
  }

  title = "Pasta's World";
}
