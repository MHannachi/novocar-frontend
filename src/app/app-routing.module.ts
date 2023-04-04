import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerComponent} from "./components/customer/customer.component";
import {OrderComponent} from "./components/order/order.component";
import {CarComponent} from "./components/car/car.component";
import {CategoryComponent} from "./components/category/category.component";
import {BrandComponent} from "./components/brand/brand.component";
import {MakeOrderComponent} from "./components/make-order/make-order.component";

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
  {
    path:'categories',
    component: CategoryComponent
  },
  {
    path:'brands',
    component: BrandComponent
  },
  {
    path:'orders/new',
    component: MakeOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
