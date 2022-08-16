import { FormControl, FormGroup, Validators } from "@angular/forms";

export class AddUserForm extends FormGroup{
    constructor(){
        super({
            email: new FormControl(null,[Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required]),
            confirmPassword: new FormControl(null, [Validators.required]),
            name: new FormControl(null, [Validators.required]),
            lastName: new FormControl(null, [Validators.required]),
            city: new FormControl(null, [Validators.required]),
            street: new FormControl(null, [Validators.required]),
            number: new FormControl(null, [Validators.required]),
            postalCode: new FormControl(null, [Validators.required]),
        });
    }
}