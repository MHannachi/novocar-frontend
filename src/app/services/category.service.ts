import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Car} from "../models/car";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  readonly API_URL = environment.host;

  private categoryUrl = this.API_URL + '/categories';

  constructor(private httpClient: HttpClient) { }

  getAllCategories(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(`${this.categoryUrl}`);
  }
  getCategoryById(id:string): Observable<HttpResponse<Car>> {
    return this.httpClient.get<Car>(`${this.categoryUrl}/${id}`, {observe:'response'});
  }

  updateCategory(customer: Car, id: string | undefined): Observable<Car> {
    return this.httpClient.put<Car>(`${this.categoryUrl}/${id}`, customer);
  }
  saveCategory(customer: Car): Observable<Car> {
    return this.httpClient.post<Car>(`${this.categoryUrl}`, customer);
  }

  removeCategory(id: string | undefined): Observable<HttpResponse<Car>> {
    return this.httpClient.delete<Car>(`${this.categoryUrl}/${id}`, {observe:'response'});
  }
}
