import { AddBookingDto } from './../models/booking/add-booking.dto';
import { PaginationModel } from 'src/app/models/pagination-model';
import { HttpParams, HttpClient } from '@angular/common/http';
import { BookingListModel } from './../models/booking/booking-list-model';
import { Observable } from 'rxjs';
import { GetPageableBookingsDto } from './../models/booking/get-pageable-bookings.dto';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import {Response} from "../models/response"

@Injectable({
  providedIn: 'root'
})
export class BookingService extends BaseService{
  public controllerPath: string = 'Booking';

  constructor(private httpClient: HttpClient) {
    super();
   }

   //addd
   //remove
   //pageable

   getPageableBookings(dto: GetPageableBookingsDto) : Observable<Response<PaginationModel<BookingListModel>>>{
    let params = new HttpParams();
    if(dto.searchTerm){
      params = params.append('searchTerm',dto.searchTerm);
    }
    params = params.append('pageSize',dto.pageSize);
    params = params.append('pageNumber',dto.pageNumber);
    params = params.append('orderBy',dto.orderBy);
    params = params.append('desc',dto.desc);

    return this.httpClient.get<Response<PaginationModel<BookingListModel>>>(this.apiPath+this.controllerPath+'/pageable',{params: params});
  }

  addBooking(dto: AddBookingDto){
    return this.httpClient.post(this.apiPath+this.controllerPath,dto);
  }

  cancelBooking(id: string){
    return this.httpClient.put(this.apiPath+this.controllerPath+'/cancel'+`/${id}`,null);
  }

}
