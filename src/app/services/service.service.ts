import { EditServiceDto } from './../models/service/edit-service-dto';
import { AddServiceDto } from './../models/service/add-service.dto';
import { ServiceListModel } from './../models/service/service-list-model';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { GetPageableServicesDto } from '../models/service/get-pageable-services.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationModel } from '../models/pagination-model';
import { SelectModel } from '../models/select-model';
import {Response} from "../models/response"

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends BaseService {
  public controllerPath = "Service";

  constructor(public http: HttpClient){
    super();
}

getPageableServices(dto: GetPageableServicesDto): Observable<Response<PaginationModel<ServiceListModel>>>{
    let httpParams = new HttpParams();

    if(dto.searchTerm != null)
        httpParams = httpParams.append('searchTerm',dto.searchTerm);

    httpParams = httpParams.append('pageSize', dto.pageSize);
    httpParams = httpParams.append('pageNumber', dto.pageNumber);
    httpParams = httpParams.append('orderBy', dto.orderBy);
    httpParams = httpParams.append('desc',dto.desc);

    return this.http.get<Response<PaginationModel<ServiceListModel>>>(this.apiPath+this.controllerPath+'/pageable', {params: httpParams});
}

addService(dto: AddServiceDto){
  return this.http.post(this.apiPath+this.controllerPath,dto);
}

updateService(dto: EditServiceDto){
  return this.http.put(this.apiPath+this.controllerPath,dto);
}

getForSelect() : Observable<Response<SelectModel<string>[]>>{
  return this.http.get<Response<SelectModel<string>[]>>(this.apiPath+this.controllerPath+'/GetForSelect');
}
}
