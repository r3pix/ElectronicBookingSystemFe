import { ManageEquipmentComponent } from './../manage-equipment/manage-equipment.component';
import { EquipmentService } from './../../../../services/equipment.service';
import { EquipmentListModel } from './../../../../models/equipment/equipment-list-model';
import { Component, OnInit } from '@angular/core';
import { GetPageableEquipmentDto } from 'src/app/models/equipment/get-pageable-equipment.dto';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { distinctUntilChanged, pairwise } from 'rxjs/operators';
import { PageableBaseForm } from 'src/app/forms/pageable.base.form';
import { PaginationModel } from 'src/app/models/pagination-model';

@Component({
  selector: 'app-equipment-catalog',
  templateUrl: './equipment-catalog.component.html',
  styleUrls: ['./equipment-catalog.component.css']
})
export class EquipmentCatalogComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog, private EquipmentService: EquipmentService ) { }

  form: PageableBaseForm;
  data: PaginationModel<EquipmentListModel> = new PaginationModel<EquipmentListModel>();

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
    this.EquipmentService.getPageableEquipments(new GetPageableEquipmentDto(this.form.value)).subscribe(x=>{
      this.data = x.result;
    });
  }

  onEdit(element: any){
    const dialogRef = this.dialog.open(ManageEquipmentComponent,{
      minWidth: '1000px',
      data: {id: element.id, element: element, isFileEdit: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true)
        this.reloadData()
    })
    }

    onFileEdit(element: any){
      const dialogRef = this.dialog.open(ManageEquipmentComponent,{
        minWidth: '1000px',
        data: {id: element.id, element: element, isFileEdit: true}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result === true)
          this.reloadData()
      })
      }

  onAdd(){
    const dialogRef = this.dialog.open(ManageEquipmentComponent,{
      minWidth: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true)
        this.reloadData();
    })
    }


}
