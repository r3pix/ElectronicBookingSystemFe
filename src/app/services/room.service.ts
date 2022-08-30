import { EditRoomDto } from './../models/room/edit-room.dto';
import { AddRoomDto } from './../models/room/add-room.dto';
import { RoomListModel } from './../models/room/room-list-model';
import { PaginationModel } from './../models/pagination-model';
import { Observable } from 'rxjs';
import { GetPageableRoomDto } from './../models/room/get-pageable-room.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import {Response} from "../models/response"

@Injectable({
  providedIn: 'root'
})
export class RoomService  extends BaseService{

  public controllerPath = 'Room';

  constructor(private httpClient: HttpClient) {
    super();
   }

   getPageableRooms(dto: GetPageableRoomDto) : Observable<Response<PaginationModel<RoomListModel>>>{
      let httpParams = new HttpParams();
      if(dto.searchTerm !== null){
        httpParams = httpParams.append('searchTerm',dto.searchTerm);
      }
      httpParams = httpParams.append('pageSize', dto.pageSize);
      httpParams = httpParams.append('pageNumber', dto.pageNumber);
      httpParams = httpParams.append('orderBy', dto.orderBy);
      httpParams = httpParams.append('desc',dto.desc);

      return this.httpClient.get<Response<PaginationModel<RoomListModel>>>(this.apiPath+this.controllerPath+'/pageable',{params: httpParams});
   }

   addRoom(dto: AddRoomDto){
    let formData = new FormData();
    formData.append('name',dto.name);
    formData.append('totalMaxPlaces',dto.totalMaxPlaces.toString());
    formData.append('totalMaxTables',dto.totalMaxTables.toString());
    formData.append('width',dto.width.toString());
    formData.append('height',dto.height.toString());
    formData.append('length',dto.length.toString());
    formData.append('description',dto.description);
    formData.append('cost',dto.cost.toString());
    formData.append('categoryId',dto.categoryId);
    formData.append('file', dto.file);
    return this.httpClient.post(this.apiPath+this.controllerPath,formData);
   }

   updateRoom(dto: EditRoomDto){
    return this.httpClient.put(this.apiPath+this.controllerPath,dto);
   }

   updateRoomPhoto(){

   }

}
