import { FormControl, FormGroup, Validators } from "@angular/forms";

export class LoginUserForm extends FormGroup{
    constructor(){
        super({
            email: new FormControl(null, [Validators.required,Validators.email]),
            password: new FormControl(null, [Validators.required]),
        });
    }
}