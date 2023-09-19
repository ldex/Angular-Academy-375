import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

    @Input() product: Product;

    deleteProduct() {
      this
        .productService
        .deleteProduct(this.product.id)
        .subscribe({
            next: () => {
              console.log('Product was deleted from the server.');
              this.productService.initProducts();
              this.router.navigateByUrl('/products');
            },
            error: err => this.router.navigateByUrl('/error')
          }
        )
    }

    constructor(
      private activatedRoute: ActivatedRoute,
      private productService: ProductService,
      private router: Router
    ) {
      let id = this.activatedRoute.snapshot.params.id;

      this
        .productService
        .getProductById(id)
        .subscribe(
          data => this.product = data
        )
    }

}
