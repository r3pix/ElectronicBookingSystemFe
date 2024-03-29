import { Observable } from 'rxjs';
import { UserListModel } from './../models/user/user-list-model';
import { GetPageableUsersDto } from './../models/user/get-pageable-users.dto';
import { LoginUserDto } from '../models/user/login-user.dto';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { AddUserDto } from '../models/user/add-user.dto';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PaginationModel } from '../models/pagination-model';
import {Response} from "../models/response"
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  public controllerPath: string = 'User';

  constructor(public router : Router, public httpClient: HttpClient, public jwtService: JwtHelperService,
    private toastService: ToastrService) {
    super();
  }

  logIn(dto: LoginUserDto) {
    this.httpClient.post<any>(this.apiPath+this.controllerPath+'/login',dto).subscribe(x=> {
      console.log(x);
        const token = x.result;
        localStorage.setItem('token',token);
        this.getUserData(token);
        this.toastService.success("Zalogowano poprawnie", "Logowanie pomyślne");
        this.router.navigate(['home']);
    },
    error => {
      this.toastService.error("Błędne dane logowania", "Błąd logowania");
    });

  }

  register(dto: AddUserDto) {
    this.httpClient.post(this.apiPath+this.controllerPath+'/register',dto).subscribe(x=>{
        this.toastService.success("Rejestracja pomyślna. Możesz się zalogować", "Rejestracja udana");
        this.router.navigate(['home']);
      },
      error => {
        this.toastService.error("Wystąpił błąd rejestracji", "Błąd rejestracji");
      });
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
      localStorage.setItem('id',x.result.id);
    });
  }

  logOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      localStorage.removeItem('id');
      this.toastService.success("Udało się wylogować", "Wylogowano");
      this.router.navigate(['home']);
      window.location.reload();
  }

  isAdmin(){
    return localStorage.getItem('role') === 'Admin';
  }

  isLogged(){
    return localStorage.getItem('token') !== null;
  }

  getRole(){
    return localStorage.getItem('role');
  }

  getName(){
    const data = { firstName: localStorage.getItem('firstName'), lastName: localStorage.getItem('lastName')}
    return data;
  }

  getPageableUsers(dto: GetPageableUsersDto) : Observable<Response<PaginationModel<UserListModel>>>{
    let httpParams = new HttpParams();

    if(dto.searchTerm != null)
        httpParams = httpParams.append('searchTerm',dto.searchTerm);

    httpParams = httpParams.append('pageSize', dto.pageSize);
    httpParams = httpParams.append('pageNumber', dto.pageNumber);
    httpParams = httpParams.append('orderBy', dto.orderBy);
    httpParams = httpParams.append('desc',dto.desc);

    return this.httpClient.get<Response<PaginationModel<UserListModel>>>(this.apiPath+this.controllerPath+'/pageable', {params: httpParams});
  }

  getUserById(id: string): Observable<Response<UserListModel>>{
    return this.httpClient.get<Response<UserListModel>>(this.apiPath+this.controllerPath+`/${id}`);
  }
}
