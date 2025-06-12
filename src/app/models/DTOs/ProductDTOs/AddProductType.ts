export default interface AddProductType{
    productCode:string,
       title:{ [key: string]: string },
       description:{ [key: string]: string },

       //key is size id,value is stock quantity Size
       sizes:{ [key: string]: number },
       categoryId:string,
       productImages:File[],
          isFeatured:boolean
}