import { Product } from "../interfaces/product";

// diese Art verwenden, wenn man unsicher ist, was aus der Datenbank kommt
export class ProductModel implements Product {
    name: string;
    description: string;
    specs: string;
    stock: number;
    price: number;

    constructor(data: Partial<Product> = {}) {
        this.name = data.name ?? "";
        this.description = data.description ?? "";
        this.specs = "n/a";
        this.stock = data.stock ?? 0;
        this.price = data.price ?? 0;
    }
}