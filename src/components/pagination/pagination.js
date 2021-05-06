import React from 'react';
import { Box } from '@material-ui/core';
import MaterialPagination from '@material-ui/lab/Pagination';

export const Pagination = ({ totalCount, page, handlePage }) => {
  if (!totalCount) {
    return null;
  }

  return (
    <Box
      component="section"
      display="flex"
      alignItems="center"
      justifyContent="center"
      my={6}
    >
      <MaterialPagination
        variant="outlined"
        count={totalCount}
        page={page}
        defaultPage={page}
        onChange={handlePage}
      />
    </Box>
  );
}
