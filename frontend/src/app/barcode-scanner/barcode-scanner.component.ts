// barcode-scanner.component.ts
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { BarcodeScannerService } from '../services/barcode-scanner.service';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css'],
})
export class BarcodeScannerComponent implements AfterViewInit {
  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner!: BarcodeScannerLivestreamComponent;

  constructor(private barcodeScannerService: BarcodeScannerService) {}

  ngAfterViewInit() {
    this.barcodeScanner.start();
  }

  onValueChanges(result: any) {
    // Handle the scanned barcode here
    const scannedBarcode = result.codeResult.code;
    
    // Emit the scanned barcode using the service
    this.barcodeScannerService.scanBarcode(scannedBarcode);
  }
}
