import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Division } from '../models/division.model';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
  private apiUrl = `${environment.apiUrl}/divisions`;

  constructor(private http: HttpClient) {}

  getDivisions(): Observable<Division[]> {
    return this.http.get<Division[]>(this.apiUrl);
  }

  getDivision(id: number): Observable<Division> {
    return this.http.get<Division>(`${this.apiUrl}/${id}`);
  }

  getSubdivisions(id: number): Observable<Division[]> {
    return this.http.get<Division[]>(`${this.apiUrl}/${id}/subdivisions`);
  }

  createDivision(division: Omit<Division, 'id'>): Observable<Division> {
    return this.http.post<Division>(this.apiUrl, division);
  }

  updateDivision(id: number, division: Partial<Division>): Observable<Division> {
    return this.http.patch<Division>(`${this.apiUrl}/${id}`, division);
  }

  deleteDivision(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}