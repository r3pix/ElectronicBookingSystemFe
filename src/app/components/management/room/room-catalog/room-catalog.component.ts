import { ManageRoomComponent } from './../manage-room/manage-room.component';
import { RoomService } from './../../../../services/room.service';
import { RoomListModel } from './../../../../models/room/room-list-model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { distinctUntilChanged, pairwise } from 'rxjs/operators';
import { PageableBaseForm } from 'src/app/forms/pageable.base.form';
import { GetPageableCategoryDto } from 'src/app/models/category/get-pageable-category.dto';
import { PaginationModel } from 'src/app/models/pagination-model';
import { ViewPictureComponent } from 'src/app/components/shared/view-picture/view-picture.component';

@Component({
  selector: 'app-room-catalog',
  templateUrl: './room-catalog.component.html',
  styleUrls: ['./room-catalog.component.css']
})
export class RoomCatalogComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog, private roomService: RoomService ) { }

  form: PageableBaseForm;
  data: PaginationModel<RoomListModel> = new PaginationModel<RoomListModel>();

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

  displayedColumns: string[] = ['name','totalMaxPlaces','totalMaxTables','width','height','length','cost','categoryName', 'actions'];


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
    this.roomService.getPageableRooms(new GetPageableCategoryDto(this.form.value)).subscribe(x=>{
      this.data = x.result;
    });
  }

  onEdit(element: any){
    const dialogRef = this.dialog.open(ManageRoomComponent,{
      minWidth: '1000px',
      data: {id: element.id, element: element, isFileEdit: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true)
        this.reloadData()
    })
    }

    onFileEdit(element: any){
      const dialogRef = this.dialog.open(ManageRoomComponent,{
        minWidth: '1000px',
        data: {id: element.id, element: element, isFileEdit: true}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result === true)
          this.reloadData()
      })
      }

  onAdd(){
    const dialogRef = this.dialog.open(ManageRoomComponent,{
      minWidth: '1000px'
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
