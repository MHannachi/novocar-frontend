import {Component, OnInit} from '@angular/core';
import {CarService} from "../../services/car.service";
import {Car} from "../../models/car";
import {Customer} from "../../models/customer"
import {OrderItem} from "../../models/orderItem";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css']
})
export class MakeOrderComponent implements OnInit{
  customers: Customer[] = [];
  selectedCustomer: Customer = new Customer();
  orderItems: OrderItem[] = [];
  products: Car[] = [];
  selectedCars : Car[] = [];
  constructor(private carService: CarService, private customerService: CustomerService) {}

  ngOnInit() {
    this.loadData()
  }
  loadData(): void{
    this.carService.getAllCars().subscribe({
      next: data => {
        this.products = data;
      }
    });
    this.customerService.getAllCustomers().subscribe({
      next: data => {
        this.customers = data;
      }
    });
  }


  selectItem(car: Car) {
    let newOrderItem = new OrderItem();
    newOrderItem.car = car;
    newOrderItem.quantity = 1;
    this.orderItems.unshift(newOrderItem);
    this.selectedCars.unshift(car);
  }

  removeOrderItem(i: number) {
    this.orderItems.splice(i,1);
  }

  addOrderItem() {

  }
}
