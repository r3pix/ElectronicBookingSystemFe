import { EditEquipmentDto } from './../models/equipment/edit-equipment.dto';
import { AddEquipmentDto } from './../models/equipment/add-equipment.dto';
import { GetPageableEquipmentDto } from './../models/equipment/get-pageable-equipment.dto';
import { EquipmentListModel } from './../models/equipment/equipment-list-model';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import {Response} from "../models/response"
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationModel } from '../models/pagination-model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService extends BaseService{

  public controllerPath = 'Equipment';

  constructor(private httpClient: HttpClient) {
    super();
   }

   getPageableEquipments(dto: GetPageableEquipmentDto) : Observable<Response<PaginationModel<EquipmentListModel>>>{
      let httpParams = new HttpParams();
      if(dto.searchTerm !== null){
        httpParams = httpParams.append('searchTerm',dto.searchTerm);
      }
      httpParams = httpParams.append('pageSize', dto.pageSize);
      httpParams = httpParams.append('pageNumber', dto.pageNumber);
      httpParams = httpParams.append('orderBy', dto.orderBy);
      httpParams = httpParams.append('desc',dto.desc);

      return this.httpClient.get<Response<PaginationModel<EquipmentListModel>>>(this.apiPath+this.controllerPath+'/pageable',{params: httpParams});
   }

   addEquipment(dto: AddEquipmentDto){
    let formData = new FormData();
    formData.append('name',dto.name);
    formData.append('cost',dto.cost.toString());
    formData.append('file', dto.file);
    return this.httpClient.post(this.apiPath+this.controllerPath,formData);
   }

   updateEquipment(dto: EditEquipmentDto){
    return this.httpClient.put(this.apiPath+this.controllerPath,dto);
   }

   updateEquipmentPhoto(roomId: string, file: File){
    let formData = new FormData();
    formData.append("equipmentId",roomId);
    formData.append("file",file);

    return this.httpClient.put(this.apiPath+this.controllerPath+'/edit-picture',formData);
   }
}
