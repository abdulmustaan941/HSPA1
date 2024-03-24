import { Component, OnInit } from '@angular/core';
import { HousingService } from '../../service/housing.service';
import { HttpClient } from '@angular/common/http';
import { IProperty } from '../IProperty.interface';
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css'
})
export class PropertyListComponent implements OnInit {
  properties!: IProperty[];
    
  constructor(private housingService: HousingService) { }

  ngOnInit(): void {
    this.housingService.getAllProperties().subscribe(
        data => {
        this.properties= data;
        console.log(data);
      }
    );
  }
}