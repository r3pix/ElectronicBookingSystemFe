interface FormValues{
  name: string;
  cost: number;
  description: string;
}

export class AddServiceDto{
  constructor(form: FormValues){
    Object.assign(this,form);
  }

  name: string;
  cost: number;
  description: string;
}
