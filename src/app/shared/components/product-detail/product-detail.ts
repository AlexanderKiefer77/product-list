import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../../services/products';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail {

  private route = inject(ActivatedRoute);
  router = inject(Router); // für Funktion Produkt löschen
  productService = inject(Products);


  // detail = { wegen signals entfernt
  //   // quasi als default
  //   "name": "n/a",
  //   "description": "n/a",
  //   "specs": "n/a",
  //   "stock": 0,
  //   "price": 0
  // }

  detail = this.productService.productdetail; // neu wegen signals

  ngOnInit() {
    let currentid = Number(this.route.snapshot.paramMap.get('id'));
    if (currentid) this.productService.setProductDetailById(currentid)

    // this.detail = this.productService.productdetail; // hier entfernt wegen signals

    // für Beispiel ohne Signals
    // in "products.ts" verschoben ist es das gleiche,  
    // setTimeout funktioniert erst, wenn man auf den löschen Button clickt.
    // bzw die Änderung wird schon durchgeführt, aber man sieht es erst wenn der Button geclickt wird.
    // Der Button löst eine change direction aus
    // setTimeout(() => {
    //   this.detail.description = "banana"
    // }, 2000)
  }

  async deleteDetail() {
    this.productService.deleteProduct(this.detail().id)
    this.router.navigate([""])
  }
}
