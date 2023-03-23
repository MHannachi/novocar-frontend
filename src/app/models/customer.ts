import {Order} from "./order";

export class Customer {
  id? : string;
  firstName? : string;
  lastName? : string;
  email? : string;
  phone? : string;
  street? : string;
  zipCode? : number;
  orderSet?: Order[];
  city?: string;
}
