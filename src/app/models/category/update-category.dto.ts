interface FormValues{
  name: string;
  id: string;
}

export class UpdateCategoryDto{
  constructor(form: FormValues){
    Object.assign(this, form);
  }

  name: string;
  id: string;
}
