import { Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class Products {

  
  supabase = createClient('', '')


  productlist = signal<Product[]>([])

  // productdetail: Product = { erstetzt durch signal
  //   // quasi als default
  //   "name": "n/a",
  //   "description": "n/a",
  //   "specs": "n/a",
  //   "stock": 0,
  //   "price": 0
  // }

  productdetail = signal<Product>({
    // quasi als default
    "id": 0, // SupaBase startet mit id 1
    "name": "n/a",
    "description": "n/a",
    "specs": "n/a",
    "stock": 0,
    "price": 0
  })

  addProduct(product: Product) {
    this.productlist.update(list => [...list, product])
  }

  setProductDetailByName(name: string) {
    let tmpProduct = this.productlist().find(product => product.name == name)
    // if (tmpProduct) this.productdetail = tmpProduct; // ersetzt wegen signal
    if (tmpProduct) this.productdetail.set(tmpProduct);

    // für Beispiel ohne Signals
    // in "product-details.ts" verschoben ist es das gleiche,  
    // setTimeout funktioniert erst, wenn man auf den löschen Button clickt.
    // bzw die Änderung wird schon durchgeführt, aber man sieht es erst wenn der Button geclickt wird.
    // Der Button löst eine change direction aus
    // setTimeout(() => {
    //this.productdetail.description = "banana" // ersetzt wegen signal
    //     this.productdetail.update(product => ({ ...product, description: "banana" }))
    //   }, 2000)
  }

  setProductDetailById(id: number) {
    let tmpProduct = this.productlist().find(product => product.id == id)
    // if (tmpProduct) this.productdetail = tmpProduct; // ersetzt wegen signal
    if (tmpProduct) this.productdetail.set(tmpProduct);
  }

  async getAllProductsFromDB() {
    let response = await this.supabase
      .from('products')
      .select('*')

    console.log(response.data);
    this.productlist.set((response.data ?? []) as Product[])
    // eine Variante, nur verwenden, wenn man ganz sicher ist, was aus der Datenbank kommt. Sonst mit einem Model siehe "productmodel.ts" arbeiten.
  }

  constructor() {
    this.getAllProductsFromDB();
  }
}
