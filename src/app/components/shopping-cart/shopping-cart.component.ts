import { Component, OnInit } from '@angular/core';
import { map } from '@firebase/util';
import { Product } from 'src/app/models/product';
import { OrderComponent } from './order/order.component';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  productList: Product[] = [];
  productMap: Map<string,number> = new Map();

  ngOnInit() {
  }

  addItem(event: any){
    //console.log(event);
    this.productList.push(event);

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(OrderComponent, {
      width: '500px',
       data: {productList: this.productList, productArray: null},
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });
  }

  onDelete(event: any){

  }

}


