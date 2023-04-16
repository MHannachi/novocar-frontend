import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './components/customer/customer.component';
import { MenuComponent } from './components/menu/menu.component';
import {MenubarModule} from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {HttpClientModule} from "@angular/common/http";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { OrderComponent } from './components/order/order.component';
import { CarComponent } from './components/car/car.component';
import { CategoryComponent } from './components/category/category.component';
import { BrandComponent } from './components/brand/brand.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { MakeOrderComponent } from './components/make-order/make-order.component';
import {PickListModule} from "primeng/picklist";
import {OrderListModule} from "primeng/orderlist";
import {TagModule} from "primeng/tag";
import {DataViewModule} from "primeng/dataview";





@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    MenuComponent,
    OrderComponent,
    CarComponent,
    CategoryComponent,
    BrandComponent,
    MakeOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    DropdownModule,
    InputNumberModule,
    PickListModule,
    OrderListModule,
    TagModule,
    DataViewModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
