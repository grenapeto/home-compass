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

  deleteInventoryItem(itemId: string): Observable<void> {
    const deleteUrl = `${this.apiUrl}/${itemId}`;
    return this.http.delete<void>(deleteUrl);
  }

  deleteInventoryItemById(itemId: string, packageId: string): Observable<void> {
const deletePackageUrl = `${this.apiUrl}/${itemId}/items/${packageId}`;
return this.http.delete<void>(deletePackageUrl);
  }
}
