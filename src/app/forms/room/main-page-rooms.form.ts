import { FormControl, FormGroup } from "@angular/forms";

export class MainPageRoomsForm extends FormGroup{
    constructor(){
        super({
            searchTerm: new FormControl(null),
            categoryIds: new FormControl(null)
        });
    }
}