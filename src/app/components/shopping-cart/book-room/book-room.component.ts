import { ToastrService } from 'ngx-toastr';
import { BookingService } from './../../../services/booking.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from 'src/app/services/file.service';
import { RoomListModel } from 'src/app/models/room/room-list-model';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { EquipmentService } from './../../../services/equipment.service';
import { ServiceService } from './../../../services/service.service';
import { DecorationService } from 'src/app/services/decoration.service';
import { ServiceListModel } from './../../../models/service/service-list-model';
import { SelectModel } from './../../../models/select-model';
import { BookingForm } from './../../../forms/booking/booking-form';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AddBookingDto } from 'src/app/models/booking/add-booking.dto';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.css']
})
export class BookRoomComponent implements OnInit {

  roomId: string;
  form: BookingForm;
  isLinear: boolean = true;
  room: RoomListModel = new RoomListModel();

  decorationUrl = null;
  equipmentUrl = null;
  serviceDescription: string = null;

  decorationCost:number = 0;
  equipmentCost: number = 0;
  serviceCost: number = 0;

  decorations: SelectModel<string>[] =[];
  services: SelectModel<string>[] =[];
  equipments: SelectModel<string>[] =[];
  occupiedDays: Date[] = [];

  totalCost: number = 0;

  filteredDecorations: Observable<SelectModel<string>[]>;
  filteredServices: Observable<SelectModel<string>[]>;
  filteredEquipments: Observable<SelectModel<string>[]>;

  constructor(private decorationService: DecorationService, private serviceService: ServiceService, private equipmentService: EquipmentService, private roomService: RoomService, private activatedRoute: ActivatedRoute,
    private fileService: FileService, private sanitizer: DomSanitizer, private bookingService: BookingService, private router: Router, private toastService: ToastrService) { }

  ngOnInit(): void {
    this.form = new BookingForm();

    this.getParams();
    this.loadSelectData();
    this.loadRoomData();
    this.loadOccupiedDays();

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

  loadOccupiedDays(){
    this.roomService.getOccupiedDays(this.roomId).subscribe(result =>{
      this.occupiedDays = result.result;
    });
  }

  dateFilter = (d: any | null): boolean =>{ //to any to jest MOMENt ale niedziala
    if(this.occupiedDays && d){
      const time=d._d.getTime();
     //this.occupiedDays.forEach(x=> {console.log(x)});
      return !this.occupiedDays.find(x=>new Date(x).getTime()==time); //niby z api wraca data ale jest to string wiec kiwka, z api zawsze ci wroci string
    }
}

  private _filterDecorations(value: string) {
    const filterValue = value.toLowerCase();

    return this.decorations.filter(decoration => decoration.label.toLowerCase().includes(filterValue));
  }

  private _filterServices(value: string) {
    const filterValue = value.toLowerCase();

    return this.services.filter(service => service.label.toLowerCase().includes(filterValue));
  }

  private _filterEquipments(value: string) {
    const filterValue = value.toLowerCase();

    return this.equipments.filter(category => category.label.toLowerCase().includes(filterValue));
  }

  recalculateTotalCost(){
    this.totalCost = this.room.cost + this.decorationCost + this.serviceCost + this.equipmentCost;
    this.form.get('totalCost').patchValue(this.totalCost);
  }

  getParams(){
    this.activatedRoute.params.subscribe(params =>{
      this.roomId = params['id'];
    });
  }

  loadRoomData(){
    this.roomService.getRoomById(this.roomId).subscribe(result => {
      this.room = result.result;
      this.recalculateTotalCost();
      this.form.get('roomId').patchValue(result.result.id);
    });
  }

  loadSelectData(){
    this.serviceService.getForSelect().subscribe(result => {
      this.services = result.result;
    });

    this.equipmentService.getForSelect().subscribe(result =>{
      this.equipments = result.result;
    });

    this.decorationService.getForSelect().subscribe(result => {
      this.decorations = result.result;
    });
  }

  //dodac dla kazdego musi byc osobny fn
  displayFnDecoration(a: any): string { //moze w tych funkcjach zaciąganie danych po wyborze? bo to wtedy się wysołuje
    if(a){
      let label = this.decorations.find(x=> x.id == a).label;
      this.loadDecorationData(a);
      return label ? label : "";
    }
    else{
      return "";
    }
  }

  displayFnServices(a: any): string {
    if(a){
      let label = this.services.find(x=> x.id == a).label;
      this.loadServiceData(a);
      return label ? label : "";
    }
    else{
      return "";
    }
  }

  displayFnEquipment(a: any): string {
    if(a){
      let label = this.equipments.find(x=> x.id == a).label;
      this.loadEquipmentData(a);
      return label ? label : "";
    }
    else{
      return "";
    }
  }

  loadServiceData(id: string){
    this.serviceService.getServiceById(id).subscribe(result => {
      this.serviceCost = result.result.cost;
      this.serviceDescription = result.result.description;
      this.recalculateTotalCost();
    })
  }

  loadEquipmentData(id: string){
    this.equipmentService.getEquipmentById(id).subscribe(result =>{
      this.equipmentCost = result.result.cost;
      this.recalculateTotalCost();
      this.fileService.getFileAsUrlById(result.result.fileId).subscribe(file =>{
        let tempUrl = URL.createObjectURL(file);
        this.equipmentUrl = this.sanitizer.bypassSecurityTrustUrl(tempUrl);
      });
    });
  }

  loadDecorationData(id: string){
    this.decorationService.getDecorationById(id).subscribe(result =>{
      this.equipmentCost = result.result.cost;
      this.recalculateTotalCost();
      this.fileService.getFileAsUrlById(result.result.fileId).subscribe(file =>{
        let tempUrl = URL.createObjectURL(file);
        this.decorationUrl = this.sanitizer.bypassSecurityTrustUrl(tempUrl);
      });
    });
  }

  save(){
    this.bookingService.addBooking(new AddBookingDto(this.form.value)).subscribe(x=>{
      this.router.navigate(['home']);
      this.toastService.success("Udało się zarezerwować salę", "Rezerwacja pomyślna");
    },
    error=>{
      this.toastService.error("Nie udało się zarezerwować sali", "Rezerwacja nieudana");
    });
  }
}
