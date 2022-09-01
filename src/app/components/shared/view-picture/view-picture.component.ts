import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileService } from './../../../services/file.service';
import { Component, Inject, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-picture',
  templateUrl: './view-picture.component.html',
  styleUrls: ['./view-picture.component.css']
})
export class ViewPictureComponent implements OnInit {

  imageLink: any;

  constructor(private fileService: FileService, private matDialogRef: MatDialogRef<ViewPictureComponent>, @Inject(MAT_DIALOG_DATA) public data: {id: string}, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loadPicture();
  }

  loadPicture(){
    this.fileService.getFileAsUrlById(this.data.id).subscribe(x=>{
      let objectUrl = URL.createObjectURL(x);
      this.imageLink = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
    });
  }

}
