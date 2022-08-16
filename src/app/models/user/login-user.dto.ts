interface FormValues{
    email: string;
    password: string;
}

export class LoginUserDto{

    constructor(form: FormValues){
        Object.assign(this,form);
    }

    email: string;
    password: string;
} 