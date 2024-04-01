import { Component, OnInit } from '@angular/core';
import { HousingService } from '../../service/housing.service';
import { HttpClient } from '@angular/common/http';
import { IProperty } from '../IProperty.interface';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css'
})
export class PropertyListComponent implements OnInit {
  properties!: IProperty[];
  SellRent = 1;
  constructor(private route: ActivatedRoute, private housingService: HousingService) { }
  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 2; // Means we are on rent-property URL else we are on base URL
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(
        data => {
        this.properties = data;
        console.log(data);
      }, error => {
        console.log('httperror:');
        console.log(error);
      }
    );
  }
}