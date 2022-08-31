interface FormValues{
  name: string;
  cost: number;
}

export class AddEquipmentDto{
  constructor(form: FormValues, file: File){
    Object.assign(this, form);
    this.file = file;
  }
  name: string;
  cost: number;
  file: File;
}
