"use client";

import { useCallback, useEffect, useState } from "react";

export const usePaginableIndexes = (
  dataLength: number,
  defaultRowsPerPage: number = 10
) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [indexesToShow, setIndexesToShow] = useState<number[]>([]);

  const getPageIndexes = useCallback(
    (page: number, rowsPerPage: number) => {
      const startIndex = (page - 1) * rowsPerPage;
      const endIndex = Math.min(startIndex + rowsPerPage, dataLength);
      return Array.from(
        { length: endIndex - startIndex },
        (_, i) => startIndex + i
      );
    },
    [dataLength]
  );

  useEffect(() => {
    const newIndices = getPageIndexes(page, rowsPerPage);
    setIndexesToShow(newIndices);
  }, [page, rowsPerPage, getPageIndexes]);

  return {
    indexesToShow,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
  };
};
