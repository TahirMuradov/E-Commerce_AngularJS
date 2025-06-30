
export default interface ResultResponseType<T>{

    data:T,
    isSuccess:boolean,
    message:string|null,
    messages:string[]|null,
    statusCode:number,
    responseLangCode: string
}