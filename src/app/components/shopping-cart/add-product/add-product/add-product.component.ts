import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  file: File;
  fileAdded: boolean;
  downloadableURL = '';

  constructor(public builder: FormBuilder, private af:  AngularFireStorage, private router: Router) { }
  registerForm: FormGroup;

  ngOnInit(): void {
    this.buildForm();
    console.log(localStorage.getItem('isAdmin'));
    console.log(localStorage.getItem('uid'));
  }

  task: AngularFireUploadTask;

  buildForm() {
    this.registerForm = this.builder.group({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
    })
  }

  upload($event){
    this.file = $event.target.files[0];
    this.fileAdded = true;
  }

  async addProduct(){

  }

  check(){
    if(!this.registerForm.valid || !this.fileAdded){
      return true;
    }
    return false;
  }
}
