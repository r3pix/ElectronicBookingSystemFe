import { AddServiceDto } from './../../../../models/service/add-service.dto';
import { ServiceService } from './../../../../services/service.service';
import { ServiceForm } from './../../../../forms/service/service-form';
import { Component, Inject, OnInit } from '@angular/core';
import { EditServiceDto } from 'src/app/models/service/edit-service-dto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-service',
  templateUrl: './manage-service.component.html',
  styleUrls: ['./manage-service.component.css']
})
export class ManageServiceComponent implements OnInit {

  form: ServiceForm;
  isEdit: boolean;

  constructor(private dialogRef:MatDialogRef<ManageServiceComponent>, @Inject(MAT_DIALOG_DATA) public data:{id: string, element: any,}, private  serviceService: ServiceService) { }

  ngOnInit(): void {
    this.form = new ServiceForm();
    if(this.data !== null)
    {
      this.isEdit = true;
      this.form.patchValue(this.data.element);
    }
    else{
      this.isEdit = false;
    }
  }

  save(){
    if(this.isEdit){
      this.serviceService.updateService(new EditServiceDto(this.form.value)).subscribe(x=>{
        this.dialogRef.close(true);
      });
    }
    else
    {
      this.serviceService.addService(new AddServiceDto(this.form.value)).subscribe(x=>{
        this.dialogRef.close(true);
      });
    }
  }
}
