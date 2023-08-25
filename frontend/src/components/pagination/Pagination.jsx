import React from "react";
import { Box, Pagination } from "@mui/material";

const CustomPagination = ({ currentPage, lastPage, onPageChange }) => {
  const handlePageChange = (event, page) => {
    if (page >= 1 && page <= lastPage) {
      onPageChange(page);
    }
  };

  return (
    <Box display="flex" justifyContent="center" marginTop={2}>
      <Pagination
        count={lastPage}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        color="primary"
      />
    </Box>
  );
};

export default CustomPagination;
