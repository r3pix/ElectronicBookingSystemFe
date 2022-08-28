import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { PageableBaseForm } from 'src/app/forms/pageable.base.form';
import { MatDialog } from '@angular/material/dialog';
import { ManageCategoryComponent } from '../manage-category/manage-category.component';
import { PaginationModel } from 'src/app/models/pagination-model';
import { CategoryListModel } from 'src/app/models/category/category-list-model';
import { CategoryService } from 'src/app/services/category.service';
import { GetPageableCategoryDto } from 'src/app/models/category/get-pageable-category.dto';
import { distinctUntilChanged } from 'rxjs/operators';
import { pairwise, take } from 'rxjs/operators';

@Component({
  selector: 'app-category-catalog',
  templateUrl: './category-catalog.component.html',
  styleUrls: ['./category-catalog.component.css']
})



export class CategoryCatalogComponent implements OnInit {

  form: PageableBaseForm;

  constructor(private router: Router, private dialog: MatDialog, private categoryService: CategoryService) { }

  data: PaginationModel<CategoryListModel> = new PaginationModel<CategoryListModel>();

  ngOnInit(): void {
    this.form = new PageableBaseForm();
    this.reloadData();

    this.form.get('searchTerm').valueChanges.pipe(
      distinctUntilChanged(),
      pairwise() // gets a pair of old and new value
    ).subscribe(([oldValue, newValue])=>{
      console.log(oldValue, newValue)
        // set previous value
        this.form.get('searchTerm').patchValue(newValue);
        this.reloadData();
    })
  }

  displayedColumns: string[] = ['position', 'actions'];


  handleChanges($event){
    //patch sort changes
    this.form.get('pageNumber').patchValue($event.pageIndex);
    this.form.get('pageSize').patchValue($event.pageSize);

    //then reload
    this.reloadData();
  }

  handleSortChange($event){
    //patch sort changes
    this.form.get('orderBy').patchValue($event.active);
    if($event.direction === 'asc')
      this.form.get('desc').patchValue(false);
    else
      this.form.get('desc').patchValue(true);
    
    //then reload
    this.reloadData();
  }

  reloadData(){
    this.categoryService.getPageableCategories(new GetPageableCategoryDto(this.form.value)).subscribe(x=>{
      this.data = x.result;
    });
  }

  onEdit(id: any, element: any){
    const dialogRef = this.dialog.open(ManageCategoryComponent,{
      minWidth: '1000px',
      data: {id: id, element: element}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true)
        this.reloadData()
    })
    }
 
  onAdd(){
    const dialogRef = this.dialog.open(ManageCategoryComponent,{
      minWidth: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true)
        this.reloadData();
    })
    }

}
