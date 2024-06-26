import { Component, OnInit, SchemaMetadata, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators, FormsModule} from '@angular/forms';
import { TabsModule, TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { IPropertyBase } from '../../model/ipropertybase';
import { FormControl,ReactiveFormsModule, } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HousingService } from '../../service/housing.service';
import { AlertifyService } from '../../service/alertify.service';
import { Property } from '../../model/property';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  schemas: [(NO_ERRORS_SCHEMA as SchemaMetadata)] 
})
export class AddPropertyComponent {
  addPropertyForm!: FormGroup;
  //@ViewChild('Form') addPropertyForm?: NgForm;
  @ViewChild('formTabs') formTabs!: TabsetComponent;

nextClicked!: boolean;
property = new Property()
// Will come from masters
propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex']
furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished']
cityList!: any[];
propertyView: IPropertyBase = {
  id: 0,
  name: '',
  price: 0,
  sellRent: 0,
  propertyType: '',
 furnishingType: '',
  bhk: 0,
  builtArea: 0,
  city: '',
  //City: '',
  readyToMove: true,

};


constructor(
  private fb: FormBuilder,
  private router: Router,
  private housingService: HousingService,
  private alertify: AlertifyService) { }

ngOnInit() {
  this.CreateAddPropertyForm();
  this.housingService.getAllCities().subscribe(data => {
    this.cityList = data;
    console.log(data);
  })
  this.housingService.getPropertyTypes().subscribe(data => {
   // this.propertyTypes = data;
});

this.housingService.getFurnishingTypes().subscribe(data => {
   // this.furnishTypes = data;
});
}

CreateAddPropertyForm() {
  this.addPropertyForm = this.fb.group({
    BasicInfo: this.fb.group({
      SellRent: ['1' , Validators.required],
      BHK: [null, Validators.required],
      PType: [null, Validators.required],
      FType: [null, Validators.required],
      Name: [null, Validators.required],
      City: [null, Validators.required]
    }),
    PriceInfo: this.fb.group({
      Price: [null, Validators.required],
      BuiltArea: [null, Validators.required],
      CarpetArea: [null],
      Security: [null],
      Maintenance: [null],
    }),
    AddressInfo: this.fb.group({
      FloorNo: [null],
      TotalFloor: [null],
      Address: [null, Validators.required],
      LandMark: [null],
    }),
    OtherInfo: this.fb.group({
      RTM: [null, Validators.required],
      PossessionOn: [null],
      AOP: [null],
      Gated: [null],
      MainEntrance: [null],
      Description: [null]
    })
    });
}
//#region <Getter Methods>
// #region <FormGroups>
    get BasicInfo() {
      return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
    }
    get PriceInfo() {
      return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
    }
    get AddressInfo() {
      return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
    }
    get OtherInfo() {
      return this.addPropertyForm.controls['OtherInfo'] as FormGroup;
    }
// #endregion
//#region <Form Controls>
    get SellRent() {
      return this.BasicInfo.controls['SellRent'] as FormControl;
    }
    get BHK() {
      return this.BasicInfo.controls['BHK'] as FormControl;
    }
    get PType() {
      return this.BasicInfo.controls['PType'] as FormControl;
    }
    get FType() {
      return this.BasicInfo.controls['FType'] as FormControl;
    }
    get Name() {
      return this.BasicInfo.controls['Name'] as FormControl;
    }
    get City() {
      return this.BasicInfo.controls['City'] as FormControl;
    }
    get Price() {
      return this.PriceInfo.controls['Price'] as FormControl;
    }
    get BuiltArea() {
      return this.PriceInfo.controls['BuiltArea'] as FormControl;
    }
    get CarpetArea() {
      return this.PriceInfo.controls['CarpetArea'] as FormControl;
    }
    get Security() {
      return this.PriceInfo.controls['Security'] as FormControl;
    }
    get Maintenance() {
      return this.PriceInfo.controls['Maintenance'] as FormControl;
    }
    get FloorNo() {
      return this.AddressInfo.controls['FloorNo'] as FormControl;
    }
    get TotalFloor() {
      return this.AddressInfo.controls['TotalFloor'] as FormControl;
    }
    get Address() {
      return this.AddressInfo.controls['Address'] as FormControl;
    }
    get LandMark() {
      return this.AddressInfo.controls['LandMark'] as FormControl;
    }
    get RTM() {
      return this.OtherInfo.controls['RTM'] as FormControl;
    }
    get PossessionOn() {
      return this.OtherInfo.controls['PossessionOn'] as FormControl;
    }
    get AOP() {
      return this.OtherInfo.controls['AOP'] as FormControl;
    }
    get Gated() {
      return this.OtherInfo.controls['Gated'] as FormControl;
    }
    get MainEntrance() {
      return this.OtherInfo.controls['MainEntrance'] as FormControl;
    }
    get Description() {
      return this.OtherInfo.controls['Description'] as FormControl;
    }
//#endregion
//#endregion
onBack() {
  this.router.navigate(['/']);
}
onSubmit() {
  this.nextClicked = true;
  if (this.allTabsValid()) {
    this.mapProperty();
    this.housingService.addProperty(this.property);
    this.alertify.success('Congrats, your property listed successfully on our website');
    console.log(this.addPropertyForm);
    if(this.SellRent.value  === '2') {
      this.router.navigate(['/rent-property']);
    } else {
      this.router.navigate(['/']);
    }
  } else {
    this.alertify.error('Please review the form and provide all valid entries');
  }
}
mapProperty(): void {
  this.property.id = this.housingService.newPropID();
  this.property.sellRent = +this.SellRent.valueOf;
  this.property.bhk = this.BHK.value;
  this.property.PType = this.PType.value;
  this.property.name = this.Name.value;
  this.property.city = this.City.value;
  this.property.FType = this.FType.value;
  this.property.price = this.Price.value;
  this.property.Security = this.Security.value;
  this.property.Maintenance = this.Maintenance.value;
  this.property.builtArea = this.BuiltArea.value;
  this.property.CarpetArea = this.CarpetArea.value;
  this.property.FloorNo = this.FloorNo.value;
  this.property.TotalFloor = this.TotalFloor.value;
  this.property.Address = this.Address.value;
  this.property.Address2 = this.LandMark.value;
  this.property.RTM = this.RTM.value;
  this.property.AOP = this.AOP.value;
  this.property.Gated = this.Gated.value;
  this.property.MainEntrance = this.MainEntrance.value;
  this.property.Possession = this.PossessionOn.value;
  this.property.Description = this.Description.value;
  this.property.PostedOn = new Date().toString();
}
allTabsValid(): boolean {
  if (this.BasicInfo.invalid) {
    this.formTabs.tabs[0].active = true;
    return false;
  }
  if (this.PriceInfo.invalid) {
    this.formTabs.tabs[1].active = true;
    return false;
  }
  if (this.AddressInfo.invalid) {
    this.formTabs.tabs[2].active = true;
    return false;
  }
  if (this.OtherInfo.invalid) {
    this.formTabs.tabs[3].active = true;
    return false;
  }
  return true;
}
selectTab(NextTabId: number, IsCurrentTabValid: boolean) {
  this.nextClicked = true;
  if (IsCurrentTabValid) {
    this.formTabs.tabs[NextTabId].active = true;
  }
}
}