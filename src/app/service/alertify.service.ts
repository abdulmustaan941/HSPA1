import { Injectable } from '@angular/core';
//import * as alertyfy from 'alertifyjs';
import * as alertyfy from '../service/alertify.service';
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  success(message: string) {
    alertyfy.success(message);
  }
  
  warning(message: string) {
   alertyfy.warning(message);
  }
  
  error(message: string) {
  alertyfy.error(message);
  }
}
export function success(message: string) {
  throw new Error('Function not implemented.');
}

export function warning(message: string) {
  throw new Error('Function not implemented.');
}

export function error(message: string) {
  throw new Error('Function not implemented.');
}

