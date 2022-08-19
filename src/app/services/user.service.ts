import { LoginUserDto } from '../models/user/login-user.dto';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { AddUserDto } from '../models/user/add-user.dto';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  public controllerPath: string = 'User';

  constructor(public router : Router, public httpClient: HttpClient, public jwtService: JwtHelperService) {
    super();
  }

  logIn(dto: LoginUserDto) {
    this.httpClient.post<any>(this.apiPath+this.controllerPath+'/login',dto).subscribe(x=> {
      const token = x.result;
      localStorage.setItem('token',token);
      this.getUserData(token);
    });
    this.router.navigate(['home']);
  }

  register(dto: AddUserDto) {
    this.httpClient.post(this.apiPath+this.controllerPath+'/register',dto).subscribe();
  }

  getUserData(jwt: string){
    const decodedToken = this.jwtService.decodeToken(jwt);
    let params = new HttpParams();
    params = params.append('email',decodedToken.email);
    this.httpClient.get<any>(this.apiPath+this.controllerPath+'/userData',{params: params}).subscribe(x=> {
      localStorage.setItem('email',x.result.email);
      localStorage.setItem('role',x.result.role);
      localStorage.setItem('firstName',x.result.name);
      localStorage.setItem('lastName',x.result.lastName);
    });
  }

  logOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      this.router.navigate(['home']);
  }

  isAdmin(){
    return localStorage.getItem('role') === 'Admin';
  }

  isLogged(){
    return localStorage.getItem('token') !== null;
  }

  getName(){
    const data = { firstName: localStorage.getItem('firstName'), lastName: localStorage.getItem('lastName')}
    return data;
  }
}
