import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../models/customer";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  readonly API_URL = environment.host;

  private brandUrl = this.API_URL + '/brands';

  constructor(private httpClient: HttpClient) { }

  getAllCategories(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.brandUrl}`);
  }
  getCategoryById(id:string): Observable<HttpResponse<Customer>> {
    return this.httpClient.get<Customer>(`${this.brandUrl}/${id}`, {observe:'response'});
  }

  updateCategory(customer: Customer, id: string | undefined): Observable<Customer> {
    return this.httpClient.put<Customer>(`${this.brandUrl}/${id}`, customer);
  }
  saveCategory(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(`${this.brandUrl}`, customer);
  }

  removeCategory(id: string | undefined): Observable<HttpResponse<Customer>> {
    return this.httpClient.delete<Customer>(`${this.brandUrl}/${id}`, {observe:'response'});
  }
}
