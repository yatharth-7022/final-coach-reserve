import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
<<<<<<< HEAD
  private apiUrl = 'https://final-coach-reserve-client.vercel.app/api';
=======
  private apiUrl =
    'https://final-coach-reserve-client.vercel.app//api';
>>>>>>> feb7831a8ec0577dd27f209c200d78b03ad6c60b

  constructor(private http: HttpClient) {}

  getReservedSeats(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/reserved-seats`);
  }

  reserveSeats(seatIds: number[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/reserve-seats`, { seatIds });
  }
}
