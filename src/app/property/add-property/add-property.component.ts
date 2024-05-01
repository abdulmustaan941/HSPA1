import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { IPropertyBase } from '../../model/ipropertybase';
@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css'
})
export class AddPropertyComponent {
  @ViewChild('Form') addPropertyForm?: NgForm;
  @ViewChild('formTabs') formTabs?: TabsetComponent;
  SellRent = '1';
cityList!: string[];

propertyView: IPropertyBase = {
  id: 0,
  name: '',
  price: 10,
  sellRent: 10,
  // PType: '',
  //FType: null,
  ///BHK: null,
  // BuiltArea: null,
  city: '',
  propertyType: '',
  furnishingType: '',
  bhk: 0,
  builtArea: 0,
  readyToMove: false
};
  housingService: any;

  constructor(private router: Router) {
    
   }
  
    ngOnInit() {
      this.CreateAddPropertyForm();
      this.housingService.getAllCities().subscribe((data: string[]) => {
        this.cityList = data;
        console.log(data);
      })
    
    setTimeout(() => {
      this.addPropertyForm?.controls['Name'].setValue('Default Value');
    });
  }
  CreateAddPropertyForm() {
    throw new Error('Method not implemented.');
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    console.log('Congrats, form Submitted');
    console.log(this.addPropertyForm);
  }
  selectTab(tabId: number) {
    this.formTabs!.tabs[tabId].active = true;
  }

}

