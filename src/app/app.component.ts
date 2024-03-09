import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { stationLinks } from './utility/metro_builder/StationsLinks';
import { StationsInfo } from './utility/metro_builder/stationsInfo';
import { Graph } from './utility/metro_builder/DijkstrasAlgo';
import { OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { MegaMenuModule } from 'primeng/megamenu';
import { InputTextModule } from 'primeng/inputtext';
import { FormGroup, FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TimelineModule } from 'primeng/timeline';
import { MatIconModule } from '@angular/material/icon';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { initFlowbite } from 'flowbite';
import { HeaderComponent } from './components/header/header.component';
import { RouteTransitionService } from './utility/animations/route-transition.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CardModule, MegaMenuModule, InputTextModule, FormsModule, ReactiveFormsModule, TimelineModule, MatIconModule, ToastModule, HeaderComponent],

  providers: [MessageService],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [RouteTransitionService.getRouteTransition()],
})
export class AppComponent implements OnInit {

  title = 'metro-link';
  StationsInfo: any
  graphObj: any;
  searchForm!: FormGroup;
  result!: any

  constructor(private fb: FormBuilder, private messageService: MessageService, private routeTransitionService: RouteTransitionService) {
    this.StationsInfo = StationsInfo
    this.initSearchForm()

  }

  ngOnInit(): void {
    initFlowbite();
  }


  initSearchForm() {
    this.searchForm = this.fb.group({
      departure: ['na', Validators.required],
      arrival: ['na', Validators.required]
    })
  }

  search() {
    this.result = []
    if (this.searchForm.value.departure === 'na' || this.searchForm.value.arrival === 'na') {
      this.messageService.add({ severity: 'info', summary: 'Invalid Search', detail: 'Departure or Arrival is not set properly!' });
      return;
    }

    if(this.searchForm.value.departure === this.searchForm.value.arrival){
      this.messageService.add({ severity: 'info', summary: 'Invalid Search', detail: 'Departure and Arrival are both set to the same station!' });
      return;
    }

    console.log(this.searchForm.value)
    this.graphObj = new Graph(stationLinks, StationsInfo);
    const data = this.graphObj.dijkstraWithLeastLineTypeChanges(this.searchForm.value.departure, this.searchForm.value.arrival)
    this.result = data.path;
    console.log(this.result)
  }

  getRouterOutletState(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }



}
