import { SelectModel } from './../../../models/select-model';
import { BookingForm } from './../../../forms/booking/booking-form';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.css']
})
export class BookRoomComponent implements OnInit {

  form: BookingForm;
  isLinear: boolean = true;

  decorations: SelectModel<string>[] =[];
  services: SelectModel<string>[] =[];
  equipments: SelectModel<string>[] =[];

  filteredDecorations: Observable<SelectModel<string>[]>;
  filteredServices: Observable<SelectModel<string>[]>;
  filteredEquipments: Observable<SelectModel<string>[]>;

  constructor() { }

  ngOnInit(): void {
    this.form = new BookingForm();

    //load select data

    this.filteredDecorations = this.form.get('decorationId').valueChanges.pipe(
      startWith(''),
      map(value => this._filterDecorations(value || '')),
    );

    this.filteredServices = this.form.get('serviceId').valueChanges.pipe(
      startWith(''),
      map(value => this._filterServices(value || '')),
    );

    this.filteredEquipments = this.form.get('equipmentId').valueChanges.pipe(
      startWith(''),
      map(value => this._filterEquipments(value || '')),
    );
  }

  private _filterDecorations(value: string) {
    const filterValue = value.toLowerCase();

    return this.decorations.filter(category => category.label.toLowerCase().includes(filterValue));
  }

  private _filterServices(value: string) {
    const filterValue = value.toLowerCase();

    return this.services.filter(category => category.label.toLowerCase().includes(filterValue));
  }

  private _filterEquipments(value: string) {
    const filterValue = value.toLowerCase();

    return this.equipments.filter(category => category.label.toLowerCase().includes(filterValue));
  }

  //dodac dla kazdego musi byc osobny fn
  displayFnDecoration(a: any): string { //moze w tych funkcjach zaciąganie danych po wyborze? bo to wtedy się wysołuje
    if(a){
      let label = this.decorations.find(x=> x.id == a).label;
      return label ? label : "";
    }
    else{
      return "";
    }
  }

  displayFnServices(a: any): string {
    if(a){
      let label = this.services.find(x=> x.id == a).label;
      return label ? label : "";
    }
    else{
      return "";
    }
  }

  displayFnEquipment(a: any): string {
    if(a){
      let label = this.equipments.find(x=> x.id == a).label;
      return label ? label : "";
    }
    else{
      return "";
    }
  }
}
