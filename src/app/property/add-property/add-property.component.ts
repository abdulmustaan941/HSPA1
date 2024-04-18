import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css'
})
export class AddPropertyComponent {
  @ViewChild('Form') addPropertyForm?: NgForm;
  @ViewChild('formTabs') formTabs?: TabsetComponent;
  SellRent = '1';
  constructor(private router: Router) {
    
   }
  ngOnInit() {
    

    setTimeout(() => {
      this.addPropertyForm?.controls['Name'].setValue('Default Value');
    });
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

