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
        routerLink: '/orders',
      },
      {
        label: 'Cars',
        icon: 'pi pi-car',
        routerLink: '/cars',
        items: [
          {
            label: 'New Car',
            icon: 'pi pi-plus',
            routerLink: '/cars/new'
          },
          {
            label: 'View Cars',
            icon: 'pi pi-table',
            routerLink: '/cars'
          }
        ]
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
