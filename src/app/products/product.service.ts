import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { Product } from "./product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private productUrl = 'api/products/products.json';

    constructor(private http: HttpClient) {}

    getProducts() : Observable<Product[]> {
        return this.http.get<Product[]>(this.productUrl).pipe(
            tap(products => console.log("All Products ", JSON.stringify(products))),
            catchError(this.handleError)
        )
    }

    handleError(err: HttpErrorResponse) {
        let errorMsg: string = '';
        if(err.error instanceof ErrorEvent) {
            errorMsg = 'An error occured ' + err.error.message;
        } else {
            errorMsg = `Server returned code an error ${err.status} and Error is ${err.message}`;
        }
        return throwError( () => errorMsg);
    }
}