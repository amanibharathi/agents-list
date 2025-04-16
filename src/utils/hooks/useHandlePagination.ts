import { useState } from "react";

const useHandlePagination = (dataPerPage = 24) => {
  const [page, setPage] = useState(1);
  // const [filteredPage, setFilteredPage]
  const [max, setMax] = useState(0);
  const [total, setTotal] = useState(1);

  const handlePaginationClick = (num: number) => {
    setPage(num);
  };

  //@ts-expect-error ignore
  const handleMaxPage = (count) => {
    setTotal(count);
    // console.log("total", count);

    const a = parseInt(count) / dataPerPage;
    if (a.toString().includes(".")) {
      //@ts-expect-error ignore
      setMax(parseInt(a) + 1);
    } else {
      setMax(a);
    }
    // console.log("maxxxxxxxxxxxxxx", a);
  };

  return { page, setPage, handleMaxPage, max, total, handlePaginationClick };
};

export default useHandlePagination;
