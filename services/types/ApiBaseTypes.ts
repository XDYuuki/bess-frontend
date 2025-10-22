export interface IPaginationData<T> {
    data: T[];
    totalPages: number;
    page: number;
    pageSize: number;
}