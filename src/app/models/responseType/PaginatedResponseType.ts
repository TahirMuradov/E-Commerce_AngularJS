export default interface PaginatedList<T>{
    paginatedData :T[],
    page :number
    totalPages:number
    pageSize :number
    collectionSize:number
    hasNextPage:boolean,
    hasPreviousPage:boolean
}