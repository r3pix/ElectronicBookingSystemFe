import { UpdateAddressDto } from './../models/address/update-address.dto';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends BaseService{
  public controllerPath: string = 'Address';

  constructor(private httpClient: HttpClient) {
    super();
   }

   updateAddress(dto: UpdateAddressDto){
    return this.httpClient.put(this.apiPath+this.controllerPath,dto);
   }
}
