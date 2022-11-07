import { AddOpinonForm } from './../../../forms/opinion/add-opinion-form';
import { ToastrService } from 'ngx-toastr';
import { OpinionModel } from './../../../models/opinion/opinion-model';
import { OpinionService } from './../../../services/opinion.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { AddOpinionModel } from 'src/app/models/opinion/add-opinion-model';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.css']
})
export class OpinionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OpinionComponent>, @Inject(MAT_DIALOG_DATA) public data: {roomId: string}, public opinionService: OpinionService,
  public toastService: ToastrService) { }

  opinions: OpinionModel[] = [];
  isAllowed:boolean = false;
  form: AddOpinonForm;

  ngOnInit(): void {
    this.loadOpinions();
    this.checkIsOpinionAllowed();
    this.fillForm();
  }

  fillForm(){
    this.form = new AddOpinonForm();
    this.form.get('roomId').patchValue(this.data.roomId);
    this.form.get('userId').patchValue(localStorage.getItem('id'));
  }

  loadOpinions(){
    this.opinionService.getOpinions(this.data.roomId).subscribe(result=>{
      this.opinions = result.result;
      this.toastService.success('Załadowano opinie', 'Udało się załadować opinie');
    },
    error => {
      this.toastService.error('Nie udało się załadować opinii', 'Błąd operacji');
    })
  }

  checkIsOpinionAllowed(){
    this.opinionService.checkIsAllowed(this.data.roomId, localStorage.getItem('id')).subscribe(result=>{
      this.isAllowed = result.result;
    },
    error =>{
      this.toastService.error('Nie udało się załadować opinii', 'Błąd operacji');
    })
  }

  save(){
    this.opinionService.addOpinion(new AddOpinionModel(this.form.value)).subscribe(result=>{
      this.toastService.success('Udało się dodac opinię','Opinia dodana');
      this.checkIsOpinionAllowed();
      this.loadOpinions();
    },
    error=>{
      this.toastService.error('Nie udało się dodać opinii', 'Błąd operacji');
    });
  }
}
