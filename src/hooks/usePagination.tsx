import { Dispatch, SetStateAction, useState } from "react";

interface IPaginate {
  limit: number,
  onPaginationChange:  Dispatch<SetStateAction<{
    pageSize: number;
    pageIndex: number;
  }>>,
  pagination: {
    pageSize: number;
    pageIndex: number;
  },
  // skip: pageSize * pageIndex,
  page: number,
}

export function usePagination() {
    const [pagination, setPagination] = useState({
      pageSize: 10,
      pageIndex: 0,
    });
    const { pageSize, pageIndex } = pagination;
  
    return {
      limit: pageSize,
      onPaginationChange: setPagination,
      pagination,
      // skip: pageSize * pageIndex,
      page: pageIndex + 1,
    };
  }