import { AddEquipmentDto } from './../../../../models/equipment/add-equipment.dto';
import { EquipmentForm } from './../../../../forms/equipment/equipment-form';
import { EquipmentService } from './../../../../services/equipment.service';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { EditEquipmentDto } from 'src/app/models/equipment/edit-equipment.dto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-equipment',
  templateUrl: './manage-equipment.component.html',
  styleUrls: ['./manage-equipment.component.css']
})
export class ManageEquipmentComponent implements OnInit {

  @ViewChild('fileUpload')
  fileUploadVariable: ElementRef;

  form: EquipmentForm;
  isEdit: boolean;
  fileName: string;
  file: File;
  isFileEdit: boolean;

  constructor(private dialogRef:MatDialogRef<ManageEquipmentComponent>, @Inject(MAT_DIALOG_DATA) public data:{id: string, element: any, isFileEdit: boolean},
  private equipmentService: EquipmentService) {
  }

  ngOnInit(): void {
    this.form = new EquipmentForm();
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
      this.equipmentService.updateEquipment(new EditEquipmentDto(this.form.value)).subscribe(x=>{
        this.dialogRef.close(true);
      });
    }
    else if(!this.isEdit)
    {
      this.equipmentService.addEquipment(new AddEquipmentDto(this.form.value, this.file)).subscribe(x=>{
        this.dialogRef.close(true);
      });
    }
    else if(this.isFileEdit){
      this.equipmentService.updateEquipmentPhoto(this.data.id, this.file).subscribe(x=>{
        this.dialogRef.close(true);
      });
    }
  }

}
