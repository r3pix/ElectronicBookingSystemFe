import { Component, OnInit, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product'
import { EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PropertiesComponent } from '../../properties/properties.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem: Product;
  @Output() addItemEvent = new EventEmitter<Product>();

  @Input() addedToWishlist: boolean;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  handleAddToCart() {
    // this.cartService.addProductToCart(this.productItem).subscribe(() => {
    //   this.msg.sendMsg(this.productItem)
    // }) poprawic ez
    //console.log(this.productItem);
    this.addItemEvent.emit(this.productItem);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(PropertiesComponent, {
      width: '600px',
       data: {product: this.productItem},
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });
  }
}
