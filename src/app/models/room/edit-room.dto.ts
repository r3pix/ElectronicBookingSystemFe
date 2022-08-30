interface FormValues{
  id:string;
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

export class EditRoomDto{
  constructor(form: FormValues){
    Object.assign(this, form);
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
}
