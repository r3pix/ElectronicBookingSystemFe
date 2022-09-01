import { UpdateIdentityDto } from './../models/identity/update-identity.dto';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdentityService extends BaseService {
  public controllerPath: string = 'Identity';

  constructor(private httpClient: HttpClient) {
    super();
   }

   updateIdentity(dto: UpdateIdentityDto){
    return this.httpClient.put(this.apiPath+this.controllerPath, dto);
   }
}
