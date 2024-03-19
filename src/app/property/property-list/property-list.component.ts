import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css'
})
export class PropertyListComponent implements OnInit {
  Properties:Array<any> = [
    {
    "Id":1,
    "Name":"Birla House",
    "Type":"House",
    "Price":1200
  },
  {
    "Id":2,
    "Name":"Erose Villa House",
    "Type":"House",
    "Price":1200
  },
  {
    "Id":3,
    "Name":"Mark Hill",
    "Type":"flat",
    "Price":12500
  },
  {
    "Id":4,
    "Name":"Gun Hill",
    "Type":"Duplex",
    "Price":11400
  },
  {
    "Id":5,
    "Name":"Marco Home",
    "Type":"House",
    "Price":14300
  },
  {
    "Id":6,
    "Name":"pearl white House",
    "Type":"House",
    "Price":18000
  },
]
  constructor(){

  }
  ngOnInit(): void {
    
  }
}
