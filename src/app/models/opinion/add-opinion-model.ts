interface FormValues{
  userId: string;
  rooomId: string;
  comment: string;
  grade: number;
}

export class AddOpinionModel{
  constructor(form: FormValues){
    Object.assign(this, form);
  }

  userId: string;
  rooomId: string;
  comment: string;
  grade: number;
}
