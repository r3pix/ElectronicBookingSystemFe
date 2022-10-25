import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookingService } from './../../../../services/booking.service';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.css']
})
export class CancelBookingComponent implements OnInit {

  constructor(private bookingService: BookingService, @Inject(MAT_DIALOG_DATA) public data: {id: string, name: string}, private dialogRef: MatDialogRef<CancelBookingComponent>, private toastService: ToastrService) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close(false);
  }

  save(){
    this.bookingService.cancelBooking(this.data.id).subscribe(x=>{
      this.dialogRef.close(true);
      this.toastService.success("Udało się anulować rezerwację", "Rezerwacja anulowana");
    },
    error=>{
      this.toastService.error("Nie udało się anulować rezerwacji", "Błąd operacji");
    });
  }

}
