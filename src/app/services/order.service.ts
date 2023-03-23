import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../models/customer";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly API_URL = environment.host;
  private orderUrl = this.API_URL + '/orders';

  constructor(private httpClient: HttpClient) { }

  getAllOrders(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.orderUrl}`);
  }
  getOrderById(id:string): Observable<HttpResponse<Customer>> {
    return this.httpClient.get<Customer>(`${this.orderUrl}/${id}`, {observe:'response'});
  }

  updateOrder(customer: Customer, id: string | undefined): Observable<Customer> {
    return this.httpClient.put<Customer>(`${this.orderUrl}/${id}`, customer);
  }
  saveOrder(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(`${this.orderUrl}`, customer);
  }

  removeOrder(id: string | undefined): Observable<HttpResponse<Customer>> {
    return this.httpClient.delete<Customer>(`${this.orderUrl}/${id}`, {observe:'response'});
  }
}
