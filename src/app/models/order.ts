import {Customer} from "./customer";
import {OrderItem} from "./orderItem";

export class Order {
  id?: string;
  customer?: Customer;
  orderItems?: OrderItem[];

}
