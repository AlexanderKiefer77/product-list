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

  async getAllProductsFromDB() {
    let response = await this.supabase
      .from('products')
      .select('*')

    console.log(response.data);
    
  }

  constructor() {
    this.getAllProductsFromDB();
    this.productlist.set([
      {
        "name": "Gaming Maus",
        "description": "Eine ergonomische Gaming-Maus mit hoher Präzision und einstellbarer DPI.Ideal für FPS- und MOBA - Spiele, bietet sie eine langlebige Bauweise und komfortable Seitentasten für schnelles Reagieren.",
        "specs": "dpi: 6400, cable length: 1.8m, color: Schwarz",
        "stock": 120,
        "price": 29.99
      },
      {
        "name": "USB-C Kabel",
        "description": "Robustes Ladekabel für Smartphones, Tablets und Laptops. Unterstützt schnelles Laden und Datenübertragung.Perfekt für den täglichen Einsatz zu Hause, im Büro oder unterwegs.",
        "specs": "length: 1m, color: Weiß, type: USB-C zu USB-A",
        "stock": 300,
        "price": 4.80
      },
      {
        "name": "Mechanische Tastatur",
        "description": "Hochwertige mechanische Tastatur mit RGB-Hintergrundbeleuchtung. Die schnellen Switches sorgen für präzise Eingaben und langen Schreibkomfort.Ideal für Gamer und Vielschreiber.",
        "specs": "switches: Red, connection: USB, color: Schwarz",
        "stock": 85,
        "price": 79.90
      },
      {
        "name": "HDMI Kabel",
        "description": "Ein zuverlässiges HDMI 2.1 Kabel, das gestochen scharfe Bilder in 4K und 8K Qualität liefert.Geeignet für Fernseher, Monitore, Konsolen und Projektoren. Unterstützt HDR und hohe Bildwiederholraten.",
        "specs": "length: 2m, version: 2.1, color: Schwarz",
        "stock": 250,
        "price": 12.99
      },
      {
        "name": "Externe SSD",
        "description": "Leistungsstarke und kompakte externe SSD für schnelle   Datenübertragung.Perfekt für große Dateien, Gaming - Bibliotheken oder als Backup - Lösung. Stoßfestes Gehäuse für den mobilen Einsatz.",
        "specs": "capacity: 1TB, interface: USB 3.2, color: Silber",
        "stock": 60,
        "price": 109.99
      },
      {
        "name": "Bluetooth Kopfhörer",
        "description": "Kabellose Over-Ear Kopfhörer mit klaren Höhen und kräftigem Bass. Dank 20 Stunden Akkulaufzeit und komfortabler Ohrpolster ideal für lange Musik - oder   Gaming - Sessions.",
        "specs": "battery life: 20h, color: Schwarz, connection: Bluetooth 5.0",
        "stock": 150,
        "price": 59.95
      }
    ])
  }
}
