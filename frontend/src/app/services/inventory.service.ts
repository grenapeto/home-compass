import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SubItem {
  _id?: string;
  expirationDate: Date;
  amount: number;
  unit?: string;
}

export interface InventoryItem {
  _id?: string;
  name: string;
  items: SubItem[];
  category: string;
  barcode: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllInventoryItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(`${this.baseUrl}/inventory`);
  }

  createInventoryItem(item: InventoryItem): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(`${this.baseUrl}/inventory`, item);
  }

  getInventoryItem(id: string): Observable<InventoryItem> {
    return this.http.get<InventoryItem>(`${this.baseUrl}/inventory/${id}`);
  }

  updateInventoryItem(id: string, item: InventoryItem): Observable<InventoryItem> {
    return this.http.put<InventoryItem>(`${this.baseUrl}/inventory/${id}`, item);
  }

  deleteInventoryItem(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/inventory/${id}`);
  }

  editInventoryItemById(inventoryId: string, itemId: string, subItem: SubItem): Observable<InventoryItem> {
    return this.http.put<InventoryItem>(`${this.baseUrl}/inventory/${inventoryId}/items/${itemId}`, subItem);
  }

  deleteInventoryItemById(inventoryId: string, itemId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/inventory/${inventoryId}/items/${itemId}`);
  }
}
