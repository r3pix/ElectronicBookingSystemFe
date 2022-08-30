import { CategoryService } from './../../../../services/category.service';
import { CategoryForm } from './../../../../forms/user/category.form';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { element } from 'protractor';
import { UpdateCategoryDto } from 'src/app/models/category/update-category.dto';
import { AddCategoryDto } from 'src/app/models/category/add-category.dto';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {

  form: CategoryForm;
  isEdit: boolean;

  constructor(private dialogRef:MatDialogRef<ManageCategoryComponent>, @Inject(MAT_DIALOG_DATA) public data:{id: string, element: any,}, private  categoryService: CategoryService) { }

  ngOnInit(): void {
    this.form = new CategoryForm();
    if(this.data !== null)
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
    if(this.isEdit){
      this.categoryService.updateCategory(new UpdateCategoryDto(this.form.value)).subscribe(x=>{
        this.dialogRef.close(true);
      });
    }
    else
    {
      this.categoryService.addCategory(new AddCategoryDto(this.form.value)).subscribe(x=>{
        this.dialogRef.close(true);
      });
    }
  }

}
