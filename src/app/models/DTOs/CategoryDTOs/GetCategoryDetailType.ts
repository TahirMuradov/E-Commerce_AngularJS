export default interface GetCategoryDetailType{
  id:string,
  categoryContent:{key:string,value:string}[],
  isFeatured:boolean
}