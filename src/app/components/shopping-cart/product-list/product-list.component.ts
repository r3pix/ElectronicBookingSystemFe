import { Product } from './../../../models/product';
import { Component, OnDestroy, OnInit, Output } from '@angular/core';

import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products;
  productList: Product[] = []
  wishlist: number[] = []

  @Output() addItemEvent = new EventEmitter<Product>();

  constructor(
  ) { }

  ngOnInit() {
    this.loadProducts();
   // this.loadWishlist();
   //console.log(this.products);
   //console.log(this.productList);
   this.productList.push(new Product(1,'taki','jaki',0,''));
   this.productList.push(new Product(1,'taki','jaki',0,''));
   this.productList.push(new Product(1,'taki','jaki',0,''));
   this.productList.push(new Product(1,'taki','jaki',0,''));
   this.productList.push(new Product(1,'taki','jaki',0,''));
   this.productList.push(new Product(1,'taki','jaki',0,''));
   this.productList.push(new Product(1,'taki','jaki',0,''));
   this.productList.push(new Product(1,'taki','jaki',0,''));
  }

  loadProducts() {
   /* this.productService.getProducts().subscribe((products) => {
      this.productList = products;
    })*/
  }

  ngOnDestroy(): void {
    this.productList.length =0;
  }

  addItem(event: any){
    //console.log(event);
    this.addItemEvent.emit(event);
  }

}
