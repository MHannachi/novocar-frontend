import {Component, OnInit} from '@angular/core';
import {Customer} from "../../models/customer";
import {CustomerService} from "../../services/customer.service";
import {MessageService} from "primeng/api";
import {Car} from "../../models/car";
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/order";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  orders: Order[] = [];
  newCustomer : Customer = new Customer();
  globalFilter: string = '';
  editingRow: boolean = false;
  addingRow: boolean = false;
  removeRow: boolean = false;
  editingRowIndex: number = -1;

  constructor(private orderService: OrderService, private customerService: CustomerService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void{
    this.orderService.getAllOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  startRemovingCustomer(rowIndex: number ){
    this.removeRow = true;
    this.editingRowIndex = rowIndex;
  }

  startEditingRow(rowIndex: number) {
    this.editingRowIndex = rowIndex;
    this.editingRow = true;
  }
  startAddingCustomer() {
    this.addingRow= true;
  }

  finishEditingRow(customer : Car) {
    this.customerService.updateCustomer(customer, customer.id).subscribe(customer => {
        this.messageService.add({severity:'success', summary:'Update!', detail:`Customer has been successfully updated`});
      },
      error => {
        this.messageService.add({severity:'error', summary:'Error', detail:`Something went wrong!`});

      });
    this.resetButtons();
  }
  finishAddingCustomer(customer : Car) {
    this.customerService.saveCustomer(customer).subscribe(customer => {
        this.messageService.add({severity:'success', summary:'Update!', detail:`Customer has been successfully saved`});
        this.newCustomer = new Car();
        this.loadData();
      },
      error => {
        this.messageService.add({severity:'error', summary:'Error', detail:`Something went wrong!`});

      });
    this.resetButtons();
  }

  resetButtons() {
    this.editingRowIndex = -1;
    this.editingRow = false;
    this.removeRow = false;
    this.addingRow = false;
  }

  removeCustomer(id: string) {
    this.customerService.removeCustomer(id).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary:'Success!', detail:`Customer has been successfully removed`});
        this.loadData()
      },
      error: () => {
        this.messageService.add({severity:'error', summary:'Error', detail:`Something went wrong!`});
      }
    })
    this.resetButtons();
  }
}
