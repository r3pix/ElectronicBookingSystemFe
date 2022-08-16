import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { MatTableModule } from '@angular/material/table';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OrderPropertiesComponent } from '../order-properties/order-properties.component';
import { ChangeOrderStatusComponent } from '../change-order-status/change-order-status.component';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit, OnDestroy {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    // this.orderService.getObservableOrders().subscribe(x=>{
    //   this.dataSource = x;
    //   //console.log(x.id);
  
    //   if(localStorage.getItem('isAdmin')!=='true'){
    //     let i:number;
    //     //let indexesToRemove: number[] = [];
    //     for(i=this.dataSource.length-1; i>=0; i--){ //od konca tak zeby nie zmniejszac tablicy, jak zmniejszasz tablice to pomijasz niektore elementy bo inkrementujesz a indeksy sie zmniejszaja
    //       if(this.dataSource[i].uid !== localStorage.getItem('uid')){
    //         this.dataSource.splice(i,1);
    //         console.log(i);
    //         //indexesToRemove.push(i);
    //       }
    //     }
    //   }
      
    // });
  }

  ngOnDestroy(): void {
    //this.orders.length =0;
    //this.orders = this.orderService.getOrders();
  }
  observableOrders: any;

  //orders: Order[]=[];

  displayedColumns = ['position','city', 'number','postalCode', 'street', 'total','status', 'actions'];
  dataSource;


  openDialog(element: any): void {
    const dialogRef = this.dialog.open(OrderPropertiesComponent, {
      width: '1000px',
       data: {order: element},
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });
  }

  checkAdminRights(){
    if(localStorage.getItem('isAdmin')==='true'){
      return true;
    }
    else{
      return false;
    }
  }

  resolveStatus(element:any){
    if(element.status===0){
      return 'Złożone';
    }
    else if(element.status===1){
      return 'W trakcie realizacji';
    }
    else if(element.status===2){
      return 'Zakończone';
    }
    else{
      return 'Błąd';
    }
  }

  changeStatus(element: any){
    const dialogRef = this.dialog.open(ChangeOrderStatusComponent, {
      width: '500px',
       data: {orderId: element.id, status: element.status},
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });
  }


}
