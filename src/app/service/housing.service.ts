import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IProperty } from '../property/IProperty.interface';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  [x: string]: any;
  
  getFurnishingTypes() {
    throw new Error('Method not implemented.');
  }
  newPropID(): any {
    throw new Error('Method not implemented.');
  }
  
  addProperty(property: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { 
    
  }
  getAllCities(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:5000/api/city');
  }
  getAllProperties(SellRent: number): Observable<IProperty[]> {
    return this.http.get<any>('data/properties.json').pipe(
      map(data => {
      const propertiesArray: Array<IProperty> = [];

      for (const id in data) {
        if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
          propertiesArray.push(data[id]);
        }
      }
      return propertiesArray;
      })
    );
    return this.http.get<IProperty[]>('data/properties.json');
  }
}
