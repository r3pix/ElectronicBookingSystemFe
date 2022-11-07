import { OpinionComponent } from './../../opinion/opinion.component';
import { element } from 'protractor';
import { Router } from '@angular/router';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product'
import { EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PropertiesComponent } from '../../properties/properties.component';
import { RoomListModel } from 'src/app/models/room/room-list-model';
import { FileService } from 'src/app/services/file.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() roomItem: RoomListModel;

  constructor(
    public dialog: MatDialog, private fileService: FileService, private sanitizer: DomSanitizer, private router: Router
  ) { }

  imageUrl;

  ngOnInit() {
    this.fileService.getFileAsUrlById(this.roomItem.fileId).subscribe(x=>{
      let urlObject = URL.createObjectURL(x);
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(urlObject);
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(PropertiesComponent, {
      width: '600px',
       data: {roomItem: this.roomItem, imageUrl: this.imageUrl},
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });
  }

  openOpinions(){
    const dialogRef = this.dialog.open(OpinionComponent, {
      width: '600px',
       data: {roomId: this.roomItem.id},
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });
  }

  handleBooking(){
    this.router.navigate(['book', {id: this.roomItem.id}]);
  }
}
