import { CancelBookingComponent } from './../cancel-booking/cancel-booking.component';
import { GetPageableBookingsDto } from './../../../../models/booking/get-pageable-bookings.dto';
import { BookingListModel } from './../../../../models/booking/booking-list-model';
import { BookingService } from './../../../../services/booking.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { distinctUntilChanged, pairwise } from 'rxjs/operators';
import { PageableBaseForm } from 'src/app/forms/pageable.base.form';
import { PaginationModel } from 'src/app/models/pagination-model';

@Component({
  selector: 'app-booking-catalog',
  templateUrl: './booking-catalog.component.html',
  styleUrls: ['./booking-catalog.component.css']
})
export class BookingCatalogComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog, private bookingService: BookingService) { }

  form: PageableBaseForm;
  data: PaginationModel<BookingListModel> = new PaginationModel<BookingListModel>();

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

  displayedColumns: string[] = ['name', 'totalPlaces', 'totalTables', 'totalCost','date', 'description','decorationName','equipmentName','roomName','serviceName','userName','userLastName','userRole','actions'];


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
    this.bookingService.getPageableBookings(new GetPageableBookingsDto(this.form.value)).subscribe(x=>{
      this.data = x.result;
    });
  }

  onCancel(element: any){
    const dialogRef = this.dialog.open(CancelBookingComponent, {
      data: {id: element.id, name: element.name}
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result == true){
        this.reloadData();
      }
    })
  }
}
