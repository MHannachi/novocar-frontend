import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Car} from "../models/car";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  readonly API_URL = environment.host;

  private brandUrl = this.API_URL + '/brands';

  constructor(private httpClient: HttpClient) { }

  getAllBrands(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(`${this.brandUrl}`);
  }
  getBrandById(id:string): Observable<HttpResponse<Car>> {
    return this.httpClient.get<Car>(`${this.brandUrl}/${id}`, {observe:'response'});
  }

  updateBrand(customer: Car, id: string | undefined): Observable<Car> {
    return this.httpClient.put<Car>(`${this.brandUrl}/${id}`, customer);
  }
  saveBrand(customer: Car): Observable<Car> {
    return this.httpClient.post<Car>(`${this.brandUrl}`, customer);
  }

  removeBrand(id: string | undefined): Observable<HttpResponse<Car>> {
    return this.httpClient.delete<Car>(`${this.brandUrl}/${id}`, {observe:'response'});
  }
}
