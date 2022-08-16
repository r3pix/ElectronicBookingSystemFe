import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { Order } from 'src/app/models/order';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  registerForm: FormGroup;
  constructor(public builder: FormBuilder,  public dialogRef: MatDialogRef<OrderComponent>,
  @Inject(MAT_DIALOG_DATA) public data: { productList: Product[] }) { }

  ngOnInit(): void {
    this.buildForm();
    //console.log(this.data.productArray)
  }


  getProduct(idd: any){
    return this.data.productList.find(x=>x.id == idd);
  }

  buildForm() {
    this.registerForm = this.builder.group({
      city: new FormControl(null, [Validators.required]),
      postalCode: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      street: new FormControl(null, [Validators.required]),
    })
  }


  get calcCartTotal () {
    let cartTotal = 0
    this.data.productList.forEach(item => {
     cartTotal += item.price;
    })
    return cartTotal;
  }

  onOrder(){
    // this.orderService.saveOrder(new Order("",this.registerForm.get('city').value,localStorage.getItem('name'),
    // this.registerForm.get('number').value,
    // this.registerForm.get('postalCode').value,
    // this.data.productList, this.registerForm.get('street').value,
    // this.calcCartTotal,localStorage.getItem('uid'),0));

    this.dialogRef.close(true);
  }
}
