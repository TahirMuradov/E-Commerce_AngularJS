<<<<<<< HEAD
export  default interface ResultResponseType<T>{
=======
export default interface ResultResponseType<T>{
>>>>>>> local
    data:T,
    isSuccess:boolean,
    message:string|null,
    messages:string[]|null,
    statusCode:number
}