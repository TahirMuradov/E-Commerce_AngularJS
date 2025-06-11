export default interface UpdatePaymentMethodType{
    id:string,
    content:{[key:string]:string}
    isCash:boolean
}