import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(route.data.roles);
    return this.checkUserLoginAndRole(route, state.url);
  }

  checkUserLoginAndRole(route: ActivatedRouteSnapshot, url: any){
    if(this.userService.isLogged() && this.checkRoleWithinArray(route.data.roles) !== -1){
      console.log('true');
      return true;
    }
    else{
      this.router.navigate(['forbidden']);
      console.log('false');
      return false;
    }
  }

  checkRoleWithinArray(roles: string[]){
    return roles.findIndex(x=> x == this.userService.getRole());
  }

}
