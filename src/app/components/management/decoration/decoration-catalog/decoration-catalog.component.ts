import { ViewPictureComponent } from './../../../shared/view-picture/view-picture.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { distinctUntilChanged, pairwise } from 'rxjs/operators';
import { PageableBaseForm } from 'src/app/forms/pageable.base.form';
import { DecorationListModel } from 'src/app/models/decoration/decoration-list-model';
import { GetPageableDecorationDto } from 'src/app/models/decoration/get-pageable-decoration.dto';
import { PaginationModel } from 'src/app/models/pagination-model';
import { DecorationService } from 'src/app/services/decoration.service';
import { ManageDecorationComponent } from '../manage-decoration/manage-decoration.component';

@Component({
  selector: 'app-decoration-catalog',
  templateUrl: './decoration-catalog.component.html',
  styleUrls: ['./decoration-catalog.component.css']
})
export class DecorationCatalogComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog, private decorationService: DecorationService ) { }

  form: PageableBaseForm;
  data: PaginationModel<DecorationListModel> = new PaginationModel<DecorationListModel>();

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

  displayedColumns: string[] = ['name','cost','actions'];


  handleChanges($event){
    //patch sort changes
    this.form.get('pageNumber').patchValue($event.pageIndex + 1);
    this.form.get('pageSize').patchValue($event.pageSize);

    //then reload
    this.reloadData();
  }

  handleSortChange($event){
    //patch sort changes
    this.form.get('orderBy').patchValue($event.active);
    if($event.direction === 'asc')
      this.form.get('desc').patchValue(false);
    else if($event.direction === 'desc')
      this.form.get('desc').patchValue(true);
    //then reload
    this.reloadData();
  }

  reloadData(){
    this.decorationService.getPageableDecorations(new GetPageableDecorationDto(this.form.value)).subscribe(x=>{
      this.data = x.result;
    });
  }

  onEdit(element: any){
    const dialogRef = this.dialog.open(ManageDecorationComponent,{
      minWidth: '300px',
      data: {id: element.id, element: element, isFileEdit: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true)
        this.reloadData()
    })
    }

    onFileEdit(element: any){
      const dialogRef = this.dialog.open(ManageDecorationComponent,{
        minWidth: '300px',
        data: {id: element.id, element: element, isFileEdit: true}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result === true)
          this.reloadData()
      })
      }

  onAdd(){
    const dialogRef = this.dialog.open(ManageDecorationComponent,{
      minWidth: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true)
        this.reloadData();
    })
    }

    openFile(element: any){
      const dialogRef = this.dialog.open(ViewPictureComponent,{
        minWidth: '500px',
        data: {id: element.fileId}
      })

      dialogRef.afterClosed().subscribe(result => {
        // if(result === true)
          // this.reloadData();
      })
    }
}
