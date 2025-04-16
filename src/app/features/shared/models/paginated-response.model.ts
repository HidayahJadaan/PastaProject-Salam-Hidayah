
interface PaginatedResponse<T>{
    page: number,
    numberOfPages: number,
    totalNumberOfItems:number,
    data: T[]
}

export default PaginatedResponse;