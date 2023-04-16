import { Component, OnInit } from '@angular/core';
import {Car} from "../../models/car";
import {CustomerService} from "../../services/customer.service";
import {MessageService} from "primeng/api";
import {Customer} from "../../models/customer";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit{
  customers: Customer[] = [];
  newCustomer : Customer = new Customer();
  globalFilter: string = '';
  editingRow: boolean = false;
  addingRow: boolean = false;
  removeRow: boolean = false;
  editingRowIndex: number = -1;

  constructor(private customerService: CustomerService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void{
    this.customerService.getAllCustomers().subscribe(customers => {
      this.customers = customers;
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
