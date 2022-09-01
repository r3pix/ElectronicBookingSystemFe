import { IdentityService } from './../../../../services/identity.service';
import { AddressService } from './../../../../services/address.service';
import { UserListModel } from './../../../../models/user/user-list-model';
import { UserService } from 'src/app/services/user.service';
import { UserForm } from './../../../../forms/user/user-form';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UpdateIdentityDto } from 'src/app/models/identity/update-identity.dto';
import { UpdateAddressDto } from 'src/app/models/address/update-address.dto';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserService, private addressService: AddressService, private identityService: IdentityService) { }

  id: string;
  form: UserForm;
  isPersonalEdit: boolean = false;
  isAddressEdit: boolean = false;

  user: UserListModel;

  ngOnInit(): void {
    this.form = new UserForm();
    console.log(this.form);
    this.getRouteParams();
    this.loadUserData();
  }

  getRouteParams(){
    this.route.params.subscribe(params =>{
      this.id = params['id'];
    });
  }

  togglePersonalEdit(){
    if(!this.isPersonalEdit){
      this.isPersonalEdit = true;
      this.form.identityForm.enable();
    }
    else{
      this.isPersonalEdit = false;
      this.form.identityForm.disable();
    }
  }

  toggleAddressEdit(){
    if(!this.isAddressEdit){
      this.isAddressEdit = true;
      this.form.addressForm.enable();
    }
    else{
      this.isAddressEdit = false;;
      this.form.addressForm.disable();
    }
  }

  addressDataChanged(){
    return this.user.street !== this.form.addressForm.get('street').value
           || this.user.number !== this.form.addressForm.get('number').value
           || this.user.postalCode !== this.form.addressForm.get('postalCode').value
           || this.user.city !== this.form.addressForm.get('city').value;
  }

  personalDataChanged(){
    return this.user.name !== this.form.identityForm.get('name').value
          || this.user.lastName !== this.form.identityForm.get('lastName').value;
  }


  loadUserData(){
    this.userService.getUserById(this.id).subscribe(x=>{
      this.user = x.result;
      //patch form data
      this.form.get('email').patchValue(this.user .email);
      this.form.get('role').patchValue(this.user .role);
      //patch address data
      this.form.addressForm.get('street').patchValue(this.user.street);
      this.form.addressForm.get('number').patchValue(this.user.number);
      this.form.addressForm.get('postalCode').patchValue(this.user.postalCode);
      this.form.addressForm.get('city').patchValue(this.user.city);
      //patch identity data
      this.form.identityForm.get('name').patchValue(this.user.name);
      this.form.identityForm.get('lastName').patchValue(this.user.lastName);
      //patch ids of lower level entities
      this.form.get('id').patchValue(this.user.id);
      this.form.addressForm.get('id').patchValue(this.user.addressId);
      this.form.identityForm.get('id').patchValue(this.user.identityId);

      this.form.disable();
      this.form.addressForm.disable();
      this.form.identityForm.disable();

    });
  }

  updateIdentity(){
    this.identityService.updateIdentity(new UpdateIdentityDto(this.form.identityForm.value)).subscribe(x=>{
      window.location.reload();
    });
  }

  updateAddress(){
    this.addressService.updateAddress(new UpdateAddressDto(this.form.addressForm.value)).subscribe(x=>{
      window.location.reload();
    });
  }

}
