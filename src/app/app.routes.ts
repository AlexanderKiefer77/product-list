import { Routes } from '@angular/router';
import { ProductList } from './shared/components/product-list/product-list';
import { ProductDetail } from './shared/components/product-detail/product-detail';
import { ProductForm } from './shared/components/product-form/product-form';


export const routes: Routes = [
    { path: "", component: ProductList },
    { path: "detail/:name", component: ProductDetail }, // name = Parametername
    { path: "productform", component:ProductForm }
];
