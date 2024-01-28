import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  isNavbarHidden: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateNavbarVisibility();
      }
    });
  }

  private updateNavbarVisibility(): void {
    // Define conditions to hide the navbar based on the current route
    this.isNavbarHidden = this.router.url === '/login' || this.router.url === '/register' || this.router.url === '/';
  }
}

