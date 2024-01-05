import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      barcode: [''],
      name: ['', Validators.required],
      category: [''],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unit:[''],
      expiryDates: this.fb.array([this.createExpiryDateControl()])
    });

    this.onQuantityChanges();
  }

  get expiryDates(): FormArray {
    return this.productForm.get('expiryDates') as FormArray;
  }

  setupBarcodeLookup(): void {
    const barcodeControl = this.productForm.get('barcode');

    if (barcodeControl) {
      barcodeControl.valueChanges.subscribe(barcode => {
        if (barcode) {
          this.lookupProduct(barcode);
        }
      });
    }
  }

  lookupProduct(barcode: string): void {
    const apiUrl = `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`;
    this.http.get<any>(apiUrl).subscribe(response => {
      if (response && response.product) {
        this.productForm.patchValue({
          name: response.product.product_name
        });
      }
    }, error => {
      console.error('Error fetching product data:', error);
    });
  }


  createExpiryDateControl(): FormControl {
    return this.fb.control('', Validators.required);
  }

  onQuantityChanges(): void {
    const quantityControl = this.productForm.get('quantity');

    if (quantityControl) {
      quantityControl.valueChanges.subscribe(quantity => {
        while (this.expiryDates.length !== quantity) {
          if (this.expiryDates.length < quantity) {
            this.expiryDates.push(this.createExpiryDateControl());
          } else {
            this.expiryDates.removeAt(this.expiryDates.length - 1);
          }
        }
      });
    }
  }

  openScanner(): void {
    // Logic to display the barcode scanner
  }

  handleScannedProduct(data: any): void {
    if (data) {
      this.productForm.patchValue({
        barcode: data.barcode,
        name: data.name
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      console.log('Form Data:', this.productForm.value);
      // Logic for form submission
    }
  }
}
