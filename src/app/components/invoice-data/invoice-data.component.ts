import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookingInvoiceModel } from 'src/app/models/booking/booking-invoice-model';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-invoice-data',
  templateUrl: './invoice-data.component.html',
  styleUrls: ['./invoice-data.component.css']
})
export class InvoiceDataComponent implements OnInit {

  constructor(private bookingService: BookingService, private toastService: ToastrService, private activatedRoute: ActivatedRoute) { }

  id: string;
  booking: BookingInvoiceModel;

  ngOnInit(): void {
    this.getRouteParams();
    this.loadBookingdata();
  }

  getRouteParams(){
    this.activatedRoute.params.subscribe(params =>{
      this.id = params['id'];
    });
  }

  loadBookingdata(){
    this.bookingService.getBookingInvoiceData(this.id).subscribe(result=>{
      this.booking = result.result;
    },
    error =>{
      this.toastService.error('Nie udało się pobrać danych', 'Błąd operacji');
    });
  }

}
