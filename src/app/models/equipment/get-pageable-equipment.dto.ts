interface FormValues{
  pageSize: number;
  pageNumber: number;
  desc: boolean;
  orderBy: string;
  searchTerm: string;
}

export class GetPageableEquipmentDto{
  constructor(form: FormValues){
    Object.assign(this,form);
  }

  pageSize: number;
  pageNumber: number;
  desc: boolean;
  orderBy: string;
  searchTerm: string;
}
