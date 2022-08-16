interface FormValues{
    email: string;
    password: string;
    name: string;
    lastName: string;
    city: string;
    street: string;
    number: string;
    postalCode:string;
}

export class AddUserDto{

    constructor(form: FormValues){
        Object.assign(this,form);
    }

    email: string;
    password: string;
    name: string;
    lastName: string;
    city: string;
    street: string;
    number: string;
    postalCode:string; 
}