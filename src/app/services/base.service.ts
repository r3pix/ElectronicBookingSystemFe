import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
    public apiPath : string = 'http://localhost:49841/api/';
    public controllerPath : string = '';

  constructor() { }
}
