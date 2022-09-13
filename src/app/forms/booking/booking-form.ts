import { FormGroup, FormControl, Validators } from '@angular/forms';
export class BookingForm extends FormGroup{
  constructor(){
    super({
      name: new FormControl(null, [Validators.required]),
      totalPlaces: new FormControl(null, [Validators.required]),
      totalTables: new FormControl(null, [Validators.required]),
      totalCost: new FormControl(null),
      date: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      decorationId: new FormControl(null, [Validators.required]),
      equipmentId: new FormControl(null, [Validators.required]),
      roomId: new FormControl(null, [Validators.required]),
      serviceId :new FormControl(null, [Validators.required])
    });
  }
}
