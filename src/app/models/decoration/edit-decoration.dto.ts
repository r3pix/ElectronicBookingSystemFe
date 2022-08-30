interface FormValues{
    id:string;
    name: string;
    cost: number;
  }
  
  export class EditDecorationDto{
    constructor(form: FormValues){
      Object.assign(this, form);
    }
  
    id: string;
    name: string;
    cost: number;
  }
  