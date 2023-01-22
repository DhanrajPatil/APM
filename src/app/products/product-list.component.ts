import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "./product";
import { ProductService } from "./product.service";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: [ './product-list.component.css' ]
})
export class ProductListComponent implements OnInit, OnDestroy{
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    sub!: Subscription;

    constructor(private productService: ProductService){}

    private _listFilter: string = '';
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(val: string) {
        this._listFilter = val;
        console.log('In setter : ' + val);
        this.filteredProducts = this.performFilter(val);
    } 

    filteredProducts: Product[] = [];
    products: Product[] = [];

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        console.log('on Init called');
        this.sub = this.productService.getProducts().subscribe({
            next: (products) => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: (error) => console.log(error)
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    performFilter(filterBy: string): Product[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter( (product) => 
            product.productName.toLocaleLowerCase().includes(filterBy)
        );
    }

    toggleImage() : void {
        this.showImage = !this.showImage;
    }

    starClicked(msg: string) {
        this.pageTitle = 'Product List ' + msg;
    }
}