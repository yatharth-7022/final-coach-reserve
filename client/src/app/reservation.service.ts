import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000/api'; //

  constructor(private http: HttpClient) {}

  getReservedSeats(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/reserved-seats`);
  }

  reserveSeats(seatIds: number[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/reserve-seats`, { seatIds });
  }
}
