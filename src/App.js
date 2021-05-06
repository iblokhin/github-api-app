import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { Header, List, Pagination } from './components';
import { useRepositories } from './hooks';

function App() {
  const {
    isLoading,
    page,
    seekText,
    totalCount,
    listRepositories,
    handlePage,
    clearResult,
    searchRepos
  } = useRepositories();

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header
        seekText={seekText}
        clearResult={clearResult}
        searchRepos={searchRepos}
      />

      <Box component="main" display="flex" flexDirection="column" flexGrow={1}>
        <Pagination
          totalCount={totalCount}
          page={page}
          handlePage={handlePage}
        />

        {
          isLoading
            ? <Box display="flex" alignItems="center" justifyContent="center" flexGrow={1}>
                <CircularProgress />
              </Box>
            : <List data={listRepositories} />
        }

        <Pagination
          totalCount={totalCount}
          page={page}
          handlePage={handlePage}
        />
      </Box>
    </Box>
  );
}

export default App;
