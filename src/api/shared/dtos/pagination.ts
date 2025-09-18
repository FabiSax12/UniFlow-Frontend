export interface PaginationRequestDto {
  page: number
  limit: number
  offset?: number
}

export interface PaginatedResponseDto<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
  }
}