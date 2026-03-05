import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Products } from '../../services/products';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {

  router = inject(Router);
  productService = inject(Products);

  productForm = new FormGroup({
    name: new FormControl('n/a', { validators: [Validators.required, Validators.minLength(3)] }),
    description: new FormControl('n/a'),
    //specs: new FormControl('n/a'),
    stock: new FormControl(0, { validators: [Validators.required, Validators.minLength(0)] }),
    price: new FormControl(0.00, { validators: [Validators.required, Validators.minLength(0)] }),
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    if (this.productForm.valid) {
      //console.log(this.productForm.value);

      // nur als Zwischenschritt
      // wenn man es nur 1x hier braucht, kann man es hierher schreiben,
      // wenn man es aber bei größeren Projekten mehrfach braucht, dann in einer Klasse im constructor einbauen
      let product: Product = {
        "name": this.productForm.value.name?this.productForm.value.name : "n/a",
        "description": this.productForm.value.description?this.productForm.value.description : "n/a",
        "specs": "n/a",
        "stock": this.productForm.value.stock?this.productForm.value.stock : 0,
        "price": this.productForm.value.price?this.productForm.value.price : 0.00,
      }


      this.productService.addProduct(product)
      this.router.navigate([""]);// "" gleich der path, wohin man will, hier ist der path "", siehe "app.routes.ts"
    }
  }

}
