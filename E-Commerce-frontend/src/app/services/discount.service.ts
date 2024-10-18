import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  constructor(private http: HttpClient) {}

  validateDiscount(code: string): Observable<any> {
    return this.http.get<any>(`/api/discounts/${code}`); // Adjust the URL as per your API
  }
}
