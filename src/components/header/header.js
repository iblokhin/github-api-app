import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles({
  header: {
    backgroundColor: '#eee',
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export const Header = ({ seekText, searchRepos, clearResult }) => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <Box display="inline-flex" alignItems="center">
        <Box mr={2}>
          <TextField
            label="Search"
            variant="outlined"
            type="text"
            value={seekText}
            onChange={searchRepos}
            size="small"
            inputProps={{ "data-testid": "search-input" }}
          />
        </Box>
        {
          seekText &&
            <Button
              size="small"
              variant="contained"
              onClick={clearResult}
            >
              Clear Text
            </Button>
        }
      </Box>
    </header>
  );
}
