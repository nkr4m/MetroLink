import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    {
        path:'', component:LandingComponent
    },
    {
        path:'search', component:DashboardComponent
    },
    {
        path:'about', component:AboutComponent
    }
];
