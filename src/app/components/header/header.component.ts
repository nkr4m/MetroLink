import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit  {
  ngOnInit(): void {
    initFlowbite();
  }
  
  constructor(private router:Router){

  }


  goToDestination(): void {
    this.router.navigate(['/search']); // Replace 'destination' with your desired route
  }

  shouldHideItem(): boolean {
    // Check if the current route is the one where you want to hide the item
    return this.router.url.includes('/search');
  }
}
