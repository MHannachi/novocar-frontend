import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Car} from "../models/customer";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  readonly API_URL = environment.host;
  private orderUrl = this.API_URL + '/orders';

  constructor(private httpClient: HttpClient) { }

  getAllOrders(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(`${this.orderUrl}`);
  }
  getOrderById(id:string): Observable<HttpResponse<Car>> {
    return this.httpClient.get<Car>(`${this.orderUrl}/${id}`, {observe:'response'});
  }

  updateOrder(customer: Car, id: string | undefined): Observable<Car> {
    return this.httpClient.put<Car>(`${this.orderUrl}/${id}`, customer);
  }
  saveOrder(customer: Car): Observable<Car> {
    return this.httpClient.post<Car>(`${this.orderUrl}`, customer);
  }

  removeOrder(id: string | undefined): Observable<HttpResponse<Car>> {
    return this.httpClient.delete<Car>(`${this.orderUrl}/${id}`, {observe:'response'});
  }
}
