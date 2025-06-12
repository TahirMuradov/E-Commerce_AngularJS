export default interface UpdateCategoryType{
    id:string,
    categoryContent:{ [key: string]: string },
    isFeatured:boolean
}