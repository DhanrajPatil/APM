import { Subscription } from 'rxjs';
import { ProductService } from './product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './product';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product Detail';
  product: Product | undefined;
  sub!: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private prService: ProductService ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += ` : ${id}`;
    this.sub = this.prService.getProducts().subscribe({
      next: (products) => {
        this.product = products.find( pr => pr.productId === id );
      },
      error: (erMsg) => console.log(erMsg)
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onBack(): void {
      this.router.navigate(['/products']);
  }
}
