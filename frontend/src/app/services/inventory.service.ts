import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://localhost:3000/api/inventory';

  constructor(private http: HttpClient) { }

  getInventoryItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addInventoryItem(item: any): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }
}
