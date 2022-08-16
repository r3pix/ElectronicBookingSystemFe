export class Order{
    id: any
    city: string;
    name: string;
    number: string;
    postalCode: string;
    products: any[];
    street: string;
    total: number;
    uid: string;
    status: number;

    constructor(id:any,city: string,
        name: string,
        number: string,
        postalCode: string,
        products: any[],
        street: string,
        total: number,
        uid: string,
        status: number)
    {
        this.city = city;
        this.number = number;
        this.name = name;
        this.postalCode = postalCode;
        this.products = products;
        this.street = street;
        this.total = total;
        this.uid = uid;
        this.status = status;
    }
}