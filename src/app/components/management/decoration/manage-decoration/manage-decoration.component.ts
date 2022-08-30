import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DecorationForm } from 'src/app/forms/decoration/decoration-form';
import { RoomForm } from 'src/app/forms/room/room-form';
import { AddDecorationDto } from 'src/app/models/decoration/add-decoration.dto';
import { EditDecorationDto } from 'src/app/models/decoration/edit-decoration.dto';
import { SelectModel } from 'src/app/models/select-model';
import { DecorationService } from 'src/app/services/decoration.service';

@Component({
  selector: 'app-manage-decoration',
  templateUrl: './manage-decoration.component.html',
  styleUrls: ['./manage-decoration.component.css']
})
export class ManageDecorationComponent implements OnInit {

  form: DecorationForm;
  isEdit: boolean;
  fileName: string;
  file: File;
  isFileEdit: boolean;

  constructor(private dialogRef:MatDialogRef<ManageDecorationComponent>, @Inject(MAT_DIALOG_DATA) public data:{id: string, element: any, isFileEdit: boolean}, 
  private  decorationService: DecorationService) {
  }

  ngOnInit(): void {
    this.form = new DecorationForm();
    if(this.data !== null)
    {
      this.isEdit = true;
      this.isFileEdit = this.data.isFileEdit;
      this.form.patchValue(this.data.element);
    }
    else{
      this.isEdit = false;
      this.isFileEdit = false;
    }
  }

  onFileChange(event){
    this.file = event.target.files[0];
    this.fileName = this.file.name;
  }

  removeFile(){
    this.fileName = null;
    this.file = null;
  }


  save(){
    if(this.isEdit && !this.isFileEdit){
      this.decorationService.updateDecoration(new EditDecorationDto(this.form.value)).subscribe(x=>{
        this.dialogRef.close(true);
      });
    }
    else if(!this.isEdit)
    {
      this.decorationService.addDecoration(new AddDecorationDto(this.form.value, this.file)).subscribe(x=>{
        this.dialogRef.close(true);
      });
    }
    else if(this.isFileEdit){
      this.decorationService.updateDecorationPhoto(this.data.id, this.file).subscribe(x=>{
        this.dialogRef.close(true);
      });
    }
  }

}
