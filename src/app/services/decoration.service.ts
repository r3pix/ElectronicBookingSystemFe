import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DecorationListModel } from '../models/decoration/decoration-list-model';
import { GetPageableDecorationDto } from '../models/decoration/get-pageable-decoration.dto';
import { PaginationModel } from '../models/pagination-model';
import { BaseService } from './base.service';
import {Response} from "../models/response"
import { AddDecorationDto } from '../models/decoration/add-decoration.dto';
import { EditDecorationDto } from '../models/decoration/edit-decoration.dto';

@Injectable({
  providedIn: 'root'
})
export class DecorationService extends BaseService {

  public controllerPath = 'Decoration';

  constructor(private httpClient: HttpClient) {
    super();
   }

   getPageableDecorations(dto: GetPageableDecorationDto) : Observable<Response<PaginationModel<DecorationListModel>>>{
      let httpParams = new HttpParams();
      if(dto.searchTerm !== null){
        httpParams = httpParams.append('searchTerm',dto.searchTerm);
      }
      httpParams = httpParams.append('pageSize', dto.pageSize);
      httpParams = httpParams.append('pageNumber', dto.pageNumber);
      httpParams = httpParams.append('orderBy', dto.orderBy);
      httpParams = httpParams.append('desc',dto.desc);

      return this.httpClient.get<Response<PaginationModel<DecorationListModel>>>(this.apiPath+this.controllerPath+'/pageable',{params: httpParams});
   }

   addDecoration(dto: AddDecorationDto){
    let formData = new FormData();
    formData.append('name',dto.name);
    formData.append('cost',dto.cost.toString());
    formData.append('file', dto.file);
    return this.httpClient.post(this.apiPath+this.controllerPath,formData);
   }

   updateDecoration(dto: EditDecorationDto){
    return this.httpClient.put(this.apiPath+this.controllerPath,dto);
   }

   updateDecorationPhoto(roomId: string, file: File){
    let formData = new FormData();
    formData.append("decorationId",roomId);
    formData.append("file",file);

    return this.httpClient.put(this.apiPath+this.controllerPath+'/edit-picture',formData);
   }
}
