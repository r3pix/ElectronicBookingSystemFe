export class Response<T>{
    result: T;
    httpStatusCode: number;
    message: string;
    isError: boolean;

}