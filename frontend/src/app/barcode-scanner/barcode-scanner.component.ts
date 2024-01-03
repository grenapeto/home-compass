import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
const Quagga = require('quagga').default;
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.less']
})
export class BarcodeScannerComponent implements OnInit, OnDestroy {
  @Output() productData = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#scanner-container'),
        constraints: {
          facingMode: "environment"
        }
      },
      decoder: {
        readers: ["code_128_reader", "ean_reader", "ean_8_reader", "upc_reader", "upc_e_reader"]
      },
      locate: true
    }, (err: Error | null) => {
      if (err) {
        console.error(err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected((result: any) => {
      const code = result.codeResult.code;
      this.lookupProduct(code);
    });
  }

  lookupProduct(barcode: string) {
    const apiUrl = `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`;
    this.http.get<any>(apiUrl).subscribe(response => {
      if (response && response['product']) {
        const productName = response['product']['product_name'];
        // Emit the product name or the entire product data as needed
        this.productData.emit({ name: productName, barcode: barcode });
      } else {
        // Handle the case where the product is not found
        console.error('Product not found');
        this.productData.emit(null);
      }
    }, error => {
      console.error('Error fetching product data:', error);
      this.productData.emit(null);
    });
  }

  ngOnDestroy() {
    Quagga.offDetected();
    Quagga.stop();
  }
}
