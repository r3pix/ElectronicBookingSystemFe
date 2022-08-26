import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

export class PageableBaseForm extends FormGroup{
  constructor(){
    super({
      searchTerm: new FormControl(null),
      pageSize: new FormControl(10),
      pageNumber: new FormControl(1),
      orderBy: new FormControl("CreateDate"),
      desc: new FormControl(true)
    });
  }
}
