import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService extends BaseService{
  public controllerPath: string = "File";

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) {
    super();
   }

  //  getFileAsUrlById(id: string){
  //     this.httpClient.get(this.apiPath+this.controllerPath+`/${id}`,{responseType: 'blob'}).subscribe(response =>{
  //       let objectUrl = URL.createObjectURL(response);
  //       let imageLink = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
  //       return imageLink;
  //   });
  //  }
  getFileAsUrlById(id: string){
     return this.httpClient.get(this.apiPath+this.controllerPath+`/${id}`,{responseType: 'blob'});
   }

}
