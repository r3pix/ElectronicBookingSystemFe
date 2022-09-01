import { Component, OnInit } from '@angular/core';
import { map } from '@firebase/util';
import { Product } from 'src/app/models/product';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Order } from 'src/app/models/order';
import { MainPageRoomsForm } from 'src/app/forms/room/main-page-rooms.form';
import { CategoryService } from 'src/app/services/category.service';
import { SelectModel } from 'src/app/models/select-model';
import { RoomListModel } from 'src/app/models/room/room-list-model';
import { RoomService } from 'src/app/services/room.service';
import { GetMainPageRoomsDto } from 'src/app/models/room/get-main-page-rooms.dto';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(public dialog: MatDialog, private categoryService: CategoryService, private roomService: RoomService) { }

  form: MainPageRoomsForm;
  options: SelectModel<string>[] = [];

  roomList: RoomListModel[] = [];

  ngOnInit() {
    this.form = new MainPageRoomsForm(); 
    this.loadCategories();

    this.reloadData();

    this.form.valueChanges.subscribe(x=>{
      this.reloadData();
    });
  }

  loadCategories(){
    this.categoryService.getForSelect().subscribe(x=>{
      this.options = x.result;
    });
  }

  reloadData(){
    this.roomService.getMainPageRooms(new GetMainPageRoomsDto(this.form.value)).subscribe(x=>{
      this.roomList = x.result;
    });
  }
}


