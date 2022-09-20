export interface FormValues{
  searchTerm: string;
  pageSize: number;
  pageNumber: number;
  orderBy: string;
  desc: boolean;
}

export class GetPageableBookingsDto{
  constructor(form: FormValues){
    Object.assign(this, form);
  }
  searchTerm: string;
  pageSize: number;
  pageNumber: number;
  orderBy: string;
  desc: boolean;
}
