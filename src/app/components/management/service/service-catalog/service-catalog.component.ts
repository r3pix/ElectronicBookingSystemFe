import { ServiceService } from './../../../../services/service.service';
import { ServiceListModel } from './../../../../models/service/service-list-model';
import { GetPageableServicesDto } from './../../../../models/service/get-pageable-services.dto';
import { ManageServiceComponent } from './../manage-service/manage-service.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { distinctUntilChanged, pairwise } from 'rxjs/operators';
import { PageableBaseForm } from 'src/app/forms/pageable.base.form';
import { PaginationModel } from 'src/app/models/pagination-model';

@Component({
  selector: 'app-service-catalog',
  templateUrl: './service-catalog.component.html',
  styleUrls: ['./service-catalog.component.css']
})
export class ServiceCatalogComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog, private serviceService: ServiceService) { }

  form: PageableBaseForm;
  data: PaginationModel<ServiceListModel> = new PaginationModel<ServiceListModel>();

  ngOnInit(): void {
    this.form = new PageableBaseForm();
    this.reloadData();

    this.form.get('searchTerm').valueChanges.pipe(
      distinctUntilChanged(),
      pairwise() // gets a pair of old and new value
    ).subscribe(([oldValue, newValue])=>{
      console.log(oldValue, newValue)
        // set previous value
        this.form.get('searchTerm').patchValue(newValue);
        this.reloadData();
    })
  }

  displayedColumns: string[] = ['name', 'description', 'cost', 'actions'];


  handleChanges($event){
    //patch sort changes
    this.form.get('pageNumber').patchValue($event.pageIndex + 1);
    this.form.get('pageSize').patchValue($event.pageSize);

    //then reload
    this.reloadData();
  }

  handleSortChange($event){
    //patch sort changes
    this.form.get('orderBy').patchValue($event.active);
    if($event.direction === 'asc')
      this.form.get('desc').patchValue(false);
    else if($event.direction === 'desc')
      this.form.get('desc').patchValue(true);
    //then reload
    this.reloadData();
  }

  reloadData(){
    this.serviceService.getPageableServices(new GetPageableServicesDto(this.form.value)).subscribe(x=>{
      this.data = x.result;
    });
  }

  onEdit(element: any){
    const dialogRef = this.dialog.open(ManageServiceComponent,{
      minWidth: '1000px',
      data: {id: element.id, element: element}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true)
        this.reloadData()
    })
    }

  onAdd(){
    const dialogRef = this.dialog.open(ManageServiceComponent,{
      minWidth: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true)
        this.reloadData();
    })
    }
}
