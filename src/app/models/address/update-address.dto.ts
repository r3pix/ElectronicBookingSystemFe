interface FormValues{
  id: string;
  city: string;
  street: string;
  number: string;
  postalCode: string;
}

export class UpdateAddressDto{
  constructor(form: FormValues){
    Object.assign(this, form)
  }

  id: string;
  city: string;
  street: string;
  number: string;
  postalCode: string;
}
