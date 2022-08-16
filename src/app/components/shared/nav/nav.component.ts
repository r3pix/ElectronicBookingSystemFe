import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public authService :AuthService) { }

  ngOnInit() {
  }

  checkLogin(){
    //console.log(localStorage.getItem('user'));
    if(localStorage.getItem('user')!=null && localStorage.getItem('user')!='null'){
      //console.log('true');
      return true;
    }
    else
    {
      return false;
    }
  }

  logOut(){
    this.authService.SignOut();
    this.authService.SignOut();
  }

  checkAdminRights(){
    if(localStorage.getItem('isAdmin')==='true'){
      return true;
    }
    else{
      return false;
    }
  }

}
