interface FormValues{
    searchTerm: string;
    categoryIds: string[];
}

export class GetMainPageRoomsDto{
    constructor(form: FormValues){
        Object.assign(this,form);
    }

    searchTerm: string;
    categoryIds: string[];
}