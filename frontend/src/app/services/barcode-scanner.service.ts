import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BarcodeScannerService {
  private barcodeScannedSubject = new BehaviorSubject<string | null>(null);
  barcodeScanned$ = this.barcodeScannedSubject.asObservable();

  scanBarcode(barcode: string): void {
    this.barcodeScannedSubject.next(barcode);
  }
}
