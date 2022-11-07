import { OpinionModel } from './../models/opinion/opinion-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AddOpinionModel } from './../models/opinion/add-opinion-model';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import {Response} from "../models/response"

@Injectable({
  providedIn: 'root'
})
export class OpinionService extends BaseService{
  public controllerPath: string = "Opinion";

  constructor(public httpClient: HttpClient) {
    super();
  }

  addOpinion(model: AddOpinionModel){
    return this.httpClient.post(this.apiPath+this.controllerPath,model);
  }

  checkIsAllowed(roomId: string, userId: string) :Observable<Response<boolean>>{
    let params = new HttpParams();
    params = params.append('roomId', roomId);
    params = params.append('userId', userId);
    return this.httpClient.get<Response<boolean>>(this.apiPath+this.controllerPath+'/is-allowed', {params: params});
  }

  getOpinions(roomId: string) : Observable<Response<OpinionModel[]>>{
    return this.httpClient.get<Response<OpinionModel[]>>(this.apiPath+this.controllerPath+`/${roomId}`);
  }
}
