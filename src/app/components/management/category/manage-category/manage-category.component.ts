import { CategoryForm } from './../../../../forms/user/category.form';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {

  form: CategoryForm;
  isEdit: boolean;

  constructor() { }

  ngOnInit(): void {
    this.form = new CategoryForm();
  }

}
