import {Component, OnInit} from '@angular/core';
import {CarService} from "../../services/car.service";
import {Car} from "../../models/car";
import {Customer} from "../../models/customer"
import {OrderItem} from "../../models/orderItem";
import {CustomerService} from "../../services/customer.service";
import {MessageService} from "primeng/api";
import {Order} from "../../models/order";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css']
})
export class MakeOrderComponent implements OnInit{
  customers: Customer[] = [];
  order: Order = new Order();
  selectedCustomer: Customer = new Customer();
  orderItems: OrderItem[] = [];
  cars: Car[] = [];
  total: number = 0.0;
  constructor(private carService: CarService,
              private customerService: CustomerService,
              private messageService: MessageService,
              private orderService: OrderService) {}

  ngOnInit() {
    this.loadData()
  }
  loadData(): void{
    this.carService.getAllCars().subscribe({
      next: data => {
        this.cars = data;
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
    if (this.orderItems.length === 0) {
      this.orderItems.unshift(newOrderItem);
    } else {
      const foundObject = this.orderItems.find(data => data.car?.id === car.id);
      if (foundObject !== undefined) {
        foundObject.quantity = (foundObject.quantity ?? 0) + 1;
      } else {
        this.orderItems.unshift(newOrderItem);
      }
    }
    this.calculateTotal();
  }

  removeOrderItem(i: number) {
    this.orderItems.splice(i,1);
    this.calculateTotal();
  }

  calculateTotal(){
    this.total = 0;
    this.orderItems.forEach(s => {
      this.total += (s.car && s.car.price || 0) * (s && s.quantity || 0);
    })
  }

  submit() {
    if(Object.keys(this.selectedCustomer).length === 0){
      this.messageService.add({severity:'warn', summary:'Tip!', detail:`Please choose a Customer`})
    }else if (this.orderItems.length < 1){
      this.messageService.add({severity:'warn', summary:'Tip!', detail:`Please choose at least one car.`})
    }else{
      this.order.orderItems = this.orderItems;
      this.order.customer = this.selectedCustomer;
      this.orderService.saveOrder(this.order).subscribe({
        next: () => {
          this.messageService.add({severity:'success', summary:'Success', detail:`Order has been successfully saved`});
        },
        error: () => {
          this.messageService.add({severity:'error', summary:'Error', detail:`Something went wrong!`});
        }
      });
    }
    console.log(this.order);
  }
}
