import { ToastrService } from 'ngx-toastr';
import { AddRoomDto } from './../../../../models/room/add-room.dto';
import { SelectModel } from './../../../../models/select-model';
import { RoomService } from './../../../../services/room.service';
import { RoomForm } from './../../../../forms/room/room-form';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryForm } from 'src/app/forms/user/category.form';
import { AddCategoryDto } from 'src/app/models/category/add-category.dto';
import { UpdateCategoryDto } from 'src/app/models/category/update-category.dto';
import { CategoryService } from 'src/app/services/category.service';
import { ManageCategoryComponent } from '../../category/manage-category/manage-category.component';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EditRoomDto } from 'src/app/models/room/edit-room.dto';

@Component({
  selector: 'app-manage-room',
  templateUrl: './manage-room.component.html',
  styleUrls: ['./manage-room.component.css']
})
export class ManageRoomComponent implements OnInit {

  @ViewChild('fileUpload')
  fileUploadVariable: ElementRef;

  form: RoomForm;
  isEdit: boolean;
  fileName: string;
  file: File;
  categories: SelectModel<string>[] = [];
  filteredOptions: Observable<SelectModel<string>[]>;
  label: string ="";
  isFileEdit: boolean;

  constructor(private dialogRef:MatDialogRef<ManageRoomComponent>, @Inject(MAT_DIALOG_DATA) public data:{id: string, element: any, isFileEdit: boolean}, private  roomService: RoomService, private categoryService: CategoryService,
  private toastService: ToastrService) {

   }

  ngOnInit(): void {
    this.form = new RoomForm();
    if(this.data !== null)
    {
      this.isEdit = true;
      this.isFileEdit = this.data.isFileEdit;
    }
    else{
      this.isEdit = false;
      this.isFileEdit = false;
    }

    this.loadSelectData();
    this.filteredOptions = this.form.get('categoryId').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }


  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.categories.filter(category => category.label.toLowerCase().includes(filterValue));
  }

  loadSelectData(){
    this.categoryService.getForSelect().subscribe(x=>{
      this.categories = x.result;
      this.form.patchValue(this.data.element); //inaczej nie dziala trzeba tutaj
    })
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

  displayFn(a: any): string {
    if(a){
      let label = this.categories.find(x=> x.id == a).label;
      return label ? label : "";
    }
    else{
      return "";
    }

  }

  save(){
    if(this.isEdit && !this.isFileEdit){
      this.roomService.updateRoom(new EditRoomDto(this.form.value)).subscribe(x=>{
        this.dialogRef.close(true);
        this.toastService.success("Udało się zaktualizować salę", "Zaktualizowano salę");
      },
      error=>{
        this.toastService.error("Nie udało się zaktualizować sali", "Błąd operacji");
      });
    }
    else if(!this.isEdit)
    {
      this.roomService.addRoom(new AddRoomDto(this.form.value, this.file)).subscribe(x=>{
        this.dialogRef.close(true);
        this.toastService.success("Udało się dodac salę", "Dodano salę");
      },
      error=>{
        this.toastService.error("Nie udało się dodać sali","Błąd operacji");
      });
    }
    else if(this.isFileEdit){
      this.roomService.updateRoomPhoto(this.data.id, this.file).subscribe(x=>{
        this.dialogRef.close(true);
        this.toastService.success("Udało się zaktualizować obrazek sali", "Zaktualizowano obrazek sali");
      },
      error=>{
        this.toastService.error("Nie udało się zaktualizować obrazka sali", "Błąd operacji");
      });
    }
  }
}
