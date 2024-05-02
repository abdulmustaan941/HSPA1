export interface IPropertyBase {
FType: any;
PType: any;
  id: number;
  sellRent: number;
  name: string;
  propertyType: string;
  furnishingType: string;
  price: number;
  bhk: number;
  builtArea: number;
  city: string;
  RTM :string;
  readyToMove: boolean;
  photo?: string;
  estPossessionOn?: string;
}
