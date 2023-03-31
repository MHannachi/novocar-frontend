import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../models/customer";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  readonly API_URL = environment.host;

  private categoryUrl = this.API_URL + '/categories';

  constructor(private httpClient: HttpClient) { }

  getAllCategories(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.categoryUrl}`);
  }
  getCategoryById(id:string): Observable<HttpResponse<Customer>> {
    return this.httpClient.get<Customer>(`${this.categoryUrl}/${id}`, {observe:'response'});
  }

  updateCategory(customer: Customer, id: string | undefined): Observable<Customer> {
    return this.httpClient.put<Customer>(`${this.categoryUrl}/${id}`, customer);
  }
  saveCategory(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(`${this.categoryUrl}`, customer);
  }

  removeCategory(id: string | undefined): Observable<HttpResponse<Customer>> {
    return this.httpClient.delete<Customer>(`${this.categoryUrl}/${id}`, {observe:'response'});
  }
}
