interface FormValues{
  id: string;
  name: string;
  lastName: string;
}

export class UpdateIdentityDto{
  constructor(form: FormValues) {
    Object.assign(this,form);
  }

  id: string;
  name: string;
  lastName: string;
}
