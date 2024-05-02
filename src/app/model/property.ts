
import { IPropertyBase } from './ipropertybase';
import { Photo } from './photo';


export class Property implements IPropertyBase {
  City!: string;
  readonlyeadyToMove!: boolean;
  Type!: string;
    FType: any;
    PType: any;
    RTM!: string;
    Id!: number;
    SellRent!: number;
    Name!: string;
    PropertyTypeId!: number;
    PropertyType!: string;
    Bhk!: number;
    FurnishingTypeId!: number;
    FurnishingType!: string;
    Price!: number;
    BuiltAreauiltArea!: number;
    carpetArea?: number;
    address!: string;
    address2?: string;
    CityId!: number;
    city!: string;
    floorNo?: string;
    totalFloors?: string;
    readyToMove!: boolean;
    age?: string;
    mainEntrance?: string;
    security?: number;
    gated?: boolean;
    maintenance?: number;
    estPossessionOn?: string;
    Photo?: string;
    description?: string;
    photos?: Photo[];
  AOP: any;
  Possession: any;
  PostedOn?: string;
  BuiltArea: any;
}
