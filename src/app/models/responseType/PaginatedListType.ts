export default interface PaginatedListType<T>{
    paginatedData :T[],
    page :number
    totalPages:number
    pageSize :number
    collectionSize:number
    hasNextPage:boolean,
    hasPreviousPage:boolean
}