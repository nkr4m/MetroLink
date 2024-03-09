import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from './../components/header/header.component';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeaderComponent],
templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  constructor(private router: Router) { }

  goToDestination(): void {
    this.router.navigate(['/search']); // Replace 'destination' with your desired route
  }

}
