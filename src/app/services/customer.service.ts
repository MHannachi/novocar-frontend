import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../models/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  readonly API_URL = environment.host;

  private brandUrl = this.API_URL + '/brands';
  private customerUrl = this.API_URL + '/customers';
  constructor(private httpClient: HttpClient) { }

  getAllCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.customerUrl}`);
  }
  getCustomerById(id:string): Observable<HttpResponse<Customer>> {
    return this.httpClient.get<Customer>(`${this.customerUrl}/${id}`, {observe:'response'});
  }

  updateCustomer(customer: Customer, id: string | undefined): Observable<Customer> {
    return this.httpClient.put<Customer>(`${this.customerUrl}/${id}`, customer);
  }
  saveCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(`${this.customerUrl}`, customer);
  }

  removeCustomer(id: string | undefined): Observable<HttpResponse<Customer>> {
    return this.httpClient.delete<Customer>(`${this.customerUrl}/${id}`, {observe:'response'});
  }

}
