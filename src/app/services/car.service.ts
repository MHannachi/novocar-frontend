import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../models/customer";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  readonly API_URL = environment.host;

  private carUrl = this.API_URL + '/cars';

  constructor(private httpClient: HttpClient) { }

  getAllCars(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.carUrl}`);
  }
  getCarById(id:string): Observable<HttpResponse<Customer>> {
    return this.httpClient.get<Customer>(`${this.carUrl}/${id}`, {observe:'response'});
  }

  updateCar(customer: Customer, id: string | undefined): Observable<Customer> {
    return this.httpClient.put<Customer>(`${this.carUrl}/${id}`, customer);
  }
  saveCar(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(`${this.carUrl}`, customer);
  }

  removeCar(id: string | undefined): Observable<HttpResponse<Customer>> {
    return this.httpClient.delete<Customer>(`${this.carUrl}/${id}`, {observe:'response'});
  }
}
