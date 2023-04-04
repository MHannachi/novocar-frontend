import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  items: MenuItem[];

  constructor() {
    this.items = [
      {
        label: 'Customers',
        icon: 'pi pi-users',
        routerLink: '/customers'
      },
      {
        label: 'Orders',
        icon: 'pi pi-shopping-cart',
        items: [
          {
            label: 'New Order',
            icon: 'pi pi-plus',
            routerLink: '/orders/new'
          },
          {
            label: 'View Orders',
            icon: 'pi pi-table',
            routerLink: '/orders'
          }
        ]
      },
      {
        label: 'Cars',
        icon: 'pi pi-car',
        routerLink: '/cars',
      },
      {
        label: 'Categories',
        icon: 'pi pi-tags',
        routerLink: '/categories',
      },
      {
        label: 'Brands',
        icon: 'pi pi-table',
        routerLink: '/brands',
      }
    ];
  }

}
