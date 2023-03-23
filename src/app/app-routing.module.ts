import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerComponent} from "./components/customer/customer.component";
import {OrderComponent} from "./components/order/order.component";
import {CarComponent} from "./components/car/car.component";

const routes: Routes = [
  {
    path:'customers',
    component: CustomerComponent
  },
  {
    path:'orders',
    component: OrderComponent
  },
  {
    path:'cars',
    component: CarComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
