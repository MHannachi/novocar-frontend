import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Car} from "../models/car";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  readonly API_URL = environment.host;

  private carUrl = this.API_URL + '/cars';

  constructor(private httpClient: HttpClient) { }

  getAllCars(): Observable<Car[]> {
    return this.httpClient.get<Car[]>(`${this.carUrl}`);
  }
  getCarById(id:string): Observable<HttpResponse<Car>> {
    return this.httpClient.get<Car>(`${this.carUrl}/${id}`, {observe:'response'});
  }

  updateCar(car: Car, id: string | undefined): Observable<Car> {
    return this.httpClient.put<Car>(`${this.carUrl}/${id}`, car);
  }

  saveCar(car: Car): Observable<Car> {
    return this.httpClient.post<Car>(`${this.carUrl}`, car);
  }

  removeCar(id: string | undefined): Observable<HttpResponse<Car>> {
    return this.httpClient.delete<Car>(`${this.carUrl}/${id}`, {observe:'response'});
  }
}
