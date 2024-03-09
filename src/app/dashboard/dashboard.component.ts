import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MegaMenuModule } from 'primeng/megamenu';
import { ToastModule } from 'primeng/toast';
import { Graph } from '../utility/metro_builder/DijkstrasAlgo';
import { StationsInfo } from '../utility/metro_builder/stationsInfo';
import { stationLinks } from '../utility/metro_builder/StationsLinks';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CardModule, MegaMenuModule, InputTextModule, FormsModule, ReactiveFormsModule, MatIconModule, ToastModule],
templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  title = 'metro-link';
  StationsInfo: any
  graphObj: any;
  searchForm!: FormGroup;
  result!: any

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.StationsInfo = StationsInfo
    this.initSearchForm()

  }

  ngOnInit(): void {

  }


  initSearchForm() {
    this.searchForm = this.fb.group({
      departure: ['na', Validators.required],
      arrival: ['na', Validators.required]
    })
  }

  search() {
    console.log("raeched search fn")
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
}
