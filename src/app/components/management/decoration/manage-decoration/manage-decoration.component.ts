import { ToastrService } from 'ngx-toastr';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DecorationForm } from 'src/app/forms/decoration/decoration-form';
import { RoomForm } from 'src/app/forms/room/room-form';
import { AddDecorationDto } from 'src/app/models/decoration/add-decoration.dto';
import { EditDecorationDto } from 'src/app/models/decoration/edit-decoration.dto';
import { SelectModel } from 'src/app/models/select-model';
import { DecorationService } from 'src/app/services/decoration.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-manage-decoration',
  templateUrl: './manage-decoration.component.html',
  styleUrls: ['./manage-decoration.component.css']
})
export class ManageDecorationComponent implements OnInit {

  @ViewChild('fileUpload')
  fileUploadVariable: ElementRef;

  form: DecorationForm;
  isEdit: boolean;
  fileName: string;
  file: File;
  isFileEdit: boolean;

  constructor(private dialogRef:MatDialogRef<ManageDecorationComponent>, @Inject(MAT_DIALOG_DATA) public data:{id: string, element: any, isFileEdit: boolean},
  private  decorationService: DecorationService, private toastService: ToastrService) {
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
    this.fileUploadVariable.nativeElement.value = "";
  }


  save(){
    if(this.isEdit && !this.isFileEdit){
      this.decorationService.updateDecoration(new EditDecorationDto(this.form.value)).subscribe(x=>{
        this.dialogRef.close(true);
        this.toastService.success("Udało się zaktualizować dekorację", "Zaktualizowano dekoracje");
      },
      error=>{
        this.toastService.error("Nie udało się zaktualizować dekoracji", "Błąd operacji");
      });
    }
    else if(!this.isEdit)
    {
      this.decorationService.addDecoration(new AddDecorationDto(this.form.value, this.file)).subscribe(x=>{
        this.dialogRef.close(true);
        this.toastService.success("Udało się dodać dekorację", "Dodano dekorację");
      },
      error=>{
        this.toastService.error("Nie udało się dodać dekoracji", "Błąd operacji");
      });
    }
    else if(this.isFileEdit){
      this.decorationService.updateDecorationPhoto(this.data.id, this.file).subscribe(x=>{
        this.dialogRef.close(true);
        this.toastService.success("Udało się zaktualizować obrazek dekoracji", "Zaktualizowano obrazek dekoracji");
      },
      error=>{
        this.toastService.error("Nie udało się zaktualizować obrazka dekoracji", "Błąd operacji");
      });
    }
  }

}
