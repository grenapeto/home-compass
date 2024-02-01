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

  barcodeValue: string = '';


  constructor(private barcodeScannerService: BarcodeScannerService) {}

  ngAfterViewInit() {
    this.barcodeScanner.start();
    console.log(`Barcode scanner started`);
  }

  onStarted(started: any) {
    console.log(started);
  }

  onValueChanges(result: any) {
    // Check if a barcode is successfully scanned
    if (result && result.codeResult && result.codeResult.code) {
      this.barcodeValue = result.codeResult.code;
      console.log('Scanned barcode:', this.barcodeValue);
      
      // Emit the scanned barcode using the service
      this.barcodeScannerService.scanBarcode(this.barcodeValue);
    } else {
      // Log when a barcode cannot be read or is not detected
      console.log('Unable to read barcode');
    }
  }
}
