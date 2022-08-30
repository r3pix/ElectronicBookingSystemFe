interface FormValues{
  name: string;
  totalMaxPlaces: number;
  totalMaxTables: number;
  width: number;
  height:number;
  length: number;
  description: string;
  cost: number;
  categoryId: string;
}

export class AddRoomDto{
  constructor(form: FormValues, file: File){
    Object.assign(this, form);
    this.file = file;
  }

  name: string;
  totalMaxPlaces: number;
  totalMaxTables: number;
  width: number;
  height:number;
  length: number;
  description: string;
  cost: number;
  categoryId: string;
  file: File;
}
