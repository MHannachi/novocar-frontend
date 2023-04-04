import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Car} from "../models/car";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  readonly API_URL = environment.host;

  private brandUrl = this.API_URL + '/brands';
  private customerUrl = this.API_URL + '/customers';
  constructor(private httpClient: HttpClient) { }

  getAllCustomers(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(`${this.customerUrl}`);
  }
  getCustomerById(id:string): Observable<HttpResponse<Car>> {
    return this.httpClient.get<Car>(`${this.customerUrl}/${id}`, {observe:'response'});
  }

  updateCustomer(customer: Car, id: string | undefined): Observable<Car> {
    return this.httpClient.put<Car>(`${this.customerUrl}/${id}`, customer);
  }
  saveCustomer(customer: Car): Observable<Car> {
    return this.httpClient.post<Car>(`${this.customerUrl}`, customer);
  }

  removeCustomer(id: string | undefined): Observable<HttpResponse<Car>> {
    return this.httpClient.delete<Car>(`${this.customerUrl}/${id}`, {observe:'response'});
  }

}
