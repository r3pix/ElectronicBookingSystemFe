import { CategoryForm } from './../../../../forms/user/category.form';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { element } from 'protractor';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {

  form: CategoryForm;
  isEdit: boolean;

  constructor(private dialogRef:MatDialogRef<ManageCategoryComponent>, @Inject(MAT_DIALOG_DATA) public data:{id: string, element: any}) { }

  ngOnInit(): void {
    this.form = new CategoryForm();
    if(this.data.id !==null)
    {
      this.isEdit = true;
      this.form.get('id').patchValue(this.data.element.id);
      this.form.get('name').patchValue(this.data.element.name);
    }
    else{
      this.isEdit = false;
    }
  }

  save(){

  }

}
