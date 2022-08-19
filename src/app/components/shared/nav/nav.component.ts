import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  userData: any;
  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  isLogged(){
    return this.userService.isLogged();
  }

  logOut(){
    console.log();
    this.userService.logOut();
  }

}
