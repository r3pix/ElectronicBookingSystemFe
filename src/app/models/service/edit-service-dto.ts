interface FormValues{
  id: string;
  name: string;
  cost: number;
  description: string;
}

export class EditServiceDto{
  constructor(form: FormValues){
    Object.assign(this,form);
  }

  id: string;
  name: string;
  cost: number;
  description: string;
}
