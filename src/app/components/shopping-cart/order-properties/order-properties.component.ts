import { Component, Inject, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-order-properties',
  templateUrl: './order-properties.component.html',
  styleUrls: ['./order-properties.component.css']
})
export class OrderPropertiesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OrderPropertiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{order: any}) { }

  ngOnInit(): void {

  }

}
