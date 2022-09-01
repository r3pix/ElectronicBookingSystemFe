import { Product } from './../../../models/product';
import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { EventEmitter } from '@angular/core';
import { RoomListModel } from 'src/app/models/room/room-list-model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products;
  
  @Input()
  roomList: RoomListModel[] = []

  constructor(
  ) { }

  ngOnInit() {
   this.loadProducts();
  }

  loadProducts() {
 
  }



}
