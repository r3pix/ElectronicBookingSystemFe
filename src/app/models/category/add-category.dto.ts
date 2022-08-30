interface FormValues{
  name: string;
}

export class AddCategoryDto{
  constructor(form: FormValues){
    Object.assign(this, form);
  }

  name: string;
}
