import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles({
  list: {
    maxWidth: '80%',
    width: '100%',
    margin: '0 auto',
    listStyle: 'none'
  },
  item: {
    margin: '16px 0',
    padding: '20px',
    boxShadow: '0 0 15px rgba(53, 45, 45, 0.1)',
    borderRadius: '10px'
  }
});

export const List = ({ data }) => {
  const classes = useStyles();

  if (!data?.length) {
    return null;
  }

  return (
    <Box component="ul" className={classes.list}>
      {data.map(({id, name, stargazers_count, description}) => {
        return (
          <Box component="li" key={id} className={classes.item}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box mr={4}>
                <Typography variant="h6" gutterBottom>
                  {name}
                </Typography>
                <Typography variant="subtitle1" component="p">
                  {description}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="flex-end">
                <StarIcon />
                <Box component="p">{stargazers_count}</Box>
              </Box>
            </Box>
          </Box>
        )
      })}
    </Box>
  );
}
