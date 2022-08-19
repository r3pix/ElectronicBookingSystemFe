import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isDropdown: boolean = false;
  title = 'Sale';

  toggleDropdown(){
    this.isDropdown = !this.isDropdown;
  }
}

