import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-change-order-status',
  templateUrl: './change-order-status.component.html',
  styleUrls: ['./change-order-status.component.css']
})
export class ChangeOrderStatusComponent implements OnInit {

  registerForm: FormGroup;
  constructor(public builder: FormBuilder,public dialogRef: MatDialogRef<ChangeOrderStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{orderId: string, status: number}) { }

  ngOnInit(): void {
    this.buildForm();
    this.registerForm.get('status').patchValue(this.data.status); 
    this.registerForm.get('orderId').patchValue(this.data.orderId); 

  }

  buildForm() {
    this.registerForm = this.builder.group({
      orderId: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
    })
  }

  onSave(){
    // this.orderService.editOrder(this.registerForm.get('orderId').value,this.registerForm.get('status').value).then(x=>{
    //   this.dialogRef.close();
    //   //window.location.reload;
    // });
  } 

  checkChange(){
    //console.log(this.registerForm.get('status').value);
    //console.log(this.data.status);
    if(this.registerForm.get('status').value !== this.data.status){
      return true;
    }
    return false;
  }


}
