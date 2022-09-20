interface FormValues{
  name: string;
  totalPlaces: number;
  totalTables: number;
  totalCost: number;
  date: string;
  description: string;
  decorationId: string;
  equipmentId: string;
  roomId: string;
  serviceId: string;
  userId: string;
}

export class AddBookingDto{
  constructor(form: FormValues){
    Object.assign(this,form);
    this.date = new Date(form.date).toISOString();
    this.userId  = localStorage.getItem('id');
    console.log(this);
    console.log(form);
  }

  name: string;
  totalPlaces: number;
  totalTables: number;
  totalCost: number;
  date: string;
  description: string;
  decorationId: string;
  equipmentId: string;
  roomId: string;
  serviceId: string;
  userId: string;
}
