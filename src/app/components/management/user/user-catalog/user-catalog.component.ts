import { UserService } from 'src/app/services/user.service';
import { UserListModel } from './../../../../models/user/user-list-model';
import { Component, OnInit } from '@angular/core';
import { GetPageableUsersDto } from 'src/app/models/user/get-pageable-users.dto';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { distinctUntilChanged, pairwise } from 'rxjs/operators';
import { PageableBaseForm } from 'src/app/forms/pageable.base.form';
import { PaginationModel } from 'src/app/models/pagination-model';

@Component({
  selector: 'app-user-catalog',
  templateUrl: './user-catalog.component.html',
  styleUrls: ['./user-catalog.component.css']
})
export class UserCatalogComponent implements OnInit {
  constructor(private router: Router, private dialog: MatDialog, private userService: UserService) { }

  form: PageableBaseForm;
  data: PaginationModel<UserListModel> = new PaginationModel<UserListModel>();

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

  displayedColumns: string[] = ['email', 'name', 'lastName', 'city', 'street', 'number', 'postalCode', 'role', 'actions'];


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
    this.userService.getPageableUsers(new GetPageableUsersDto(this.form.value)).subscribe(x=>{
      this.data = x.result;
    });
  }

  onEdit(element: any){
    this.router.navigate(['management','users','details',{id: element.id}]);
  }

  onAdd(){
    // const dialogRef = this.dialog.open(ManageServiceComponent,{
    //   minWidth: '1000px'
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if(result === true)
    //     this.reloadData();
    // })
    }

}
