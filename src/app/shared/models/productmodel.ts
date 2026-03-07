import { Product } from "../interfaces/product";

// diese Art verwenden, wenn man unsicher ist, was aus der Datenbank kommt
export class ProductModel implements Product {
    id: number;
    name: string;
    description: string;
    specs: string;
    stock: number;
    price: number;

    constructor(data: Partial<Product> = {}) {
        this.id = data.id ?? 0;
        this.name = data.name ?? "";
        this.description = data.description ?? "";
        this.specs = "n/a";
        this.stock = data.stock ?? 0;
        this.price = data.price ?? 0;
    }

    getCleanAddJson() { // für ein neues Produkt ohne ID zur DB hinzuzufügen
        return {
            name: this.name,
            description: this.description,
            specs: this.specs,
            stock: this.stock,
            price: this.price,
        }
    }
}