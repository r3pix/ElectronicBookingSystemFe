import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isDropdown: boolean = false;
  title = 'Sale';

  constructor(public userService: UserService){}

  toggleDropdown(){
    this.isDropdown = !this.isDropdown;
  }
}

