import { Flex } from "@chakra-ui/react";
import ReactPaginate from "react-paginate";

//@ts-expect-error ignore
const PaginationComponent = ({
  handlePaginationClick,
  pageCount,
  initialPage,
  forcePage,
}: {
  handlePaginationClick: any;
  pageCount: number;
  initialPage?: number;
  forcePage?: number;
}) => {
  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    if (handlePaginationClick) {
      handlePaginationClick(event?.selected + 1);
    }
  };

  return (
    <Flex w={"600px"} margin={"auto"} justifyContent={"center"}>
      <ReactPaginate
        initialPage={initialPage}
        forcePage={forcePage}
        onPageChange={handlePageClick}
        pageRangeDisplayed={6}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        marginPagesDisplayed={0}
        previousLabel="<"
        breakLabel=""
        nextLabel=">"
        containerClassName="flex gap-[0.75rem]"
        previousLinkClassName="paginate-elem paginate-label"
        nextLinkClassName="paginate-elem paginate-label"
        pageLinkClassName="paginate-elem paginate-link bg-white"
        activeLinkClassName="paginate-link-active border-[1] border-red"
        disabledClassName="hidden"
      />
    </Flex>
  );
};

export default PaginationComponent;
