import { Component, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { BarcodeScannerLivestreamComponent } from "ngx-barcode-scanner";

@Component({
  selector: 'app-barcode-scanner',
  template: `
    <barcode-scanner-livestream
      class="barcode-scanner"
      type="ean"
      (valueChanges)="onValueChanges($event)"
      (started)="onStarted($event)"
    ></barcode-scanner-livestream>
    <div [hidden]="!barcodeValue">
      {{ barcodeValue }}
    </div>
  `,
  styleUrls: ['./barcode-scanner.component.css'] // Ensure you have the correct path
})
export class BarcodeScannerComponent implements AfterViewInit {
  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner!: BarcodeScannerLivestreamComponent;

  barcodeValue: any;

  @Output() barcodeScanned = new EventEmitter<string>(); // Add this line

  ngAfterViewInit() {
    this.barcodeScanner.start();
  }

  onValueChanges(result: any) {
    this.barcodeScanned.emit(result.codeResult.code); // Emit the scanned barcode
    this.barcodeScanner.stop(); // Stop the scanner
  }

  onStarted(started: any) {
    console.log(started);
  }
}