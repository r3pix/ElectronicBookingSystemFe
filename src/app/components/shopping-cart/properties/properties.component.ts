import { Component, Inject, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RoomListModel } from 'src/app/models/room/room-list-model';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PropertiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{roomItem: RoomListModel, imageUrl: string} ) { }

  ngOnInit(): void {
  }


  
}
