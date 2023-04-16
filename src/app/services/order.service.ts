import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from "../models/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly API_URL = environment.host;
  private orderUrl = this.API_URL + '/orders';

  constructor(private httpClient: HttpClient) { }

  getAllOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.orderUrl}`);
  }
  getOrderById(id:string): Observable<HttpResponse<Order>> {
    return this.httpClient.get<Order>(`${this.orderUrl}/${id}`, {observe:'response'});
  }

  updateOrder(order: Order, id: string | undefined): Observable<Order> {
    return this.httpClient.put<Order>(`${this.orderUrl}/${id}`, order);
  }
  saveOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(`${this.orderUrl}`, order);
  }

  removeOrder(id: string | undefined): Observable<HttpResponse<Order>> {
    return this.httpClient.delete<Order>(`${this.orderUrl}/${id}`, {observe:'response'});
  }
}
