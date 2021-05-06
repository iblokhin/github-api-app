import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { API } from '../api-config';

const PER_PAGE = 30;
const CancelToken = axios.CancelToken;
let cancelRequest;

const useQueryParams = () => {
  return new URLSearchParams(useLocation()?.search);
}

export const useRepositories = () => {
  const query = useQueryParams();
  const { push } = useHistory();
  const [page, setPage] = useState(Number(query?.get("page")) ?? 1);
  const [seekText, setSearchText] = useState(query?.get("q") ?? "");

  const { isLoading, data } = useQuery(
    [`repositories-${page}-${seekText}`],
    async () => getRepositories(),
    { keepPreviousData : true }
  )

  const getRepositories = async () => {
    const url = `/search/repositories?q=${seekText}+in:name&page=${page}&per_page=${PER_PAGE}&sort=stars&order=desc`

    if (!seekText) {
      return null;
    }

    if (typeof cancelRequest === 'function') {
      cancelRequest();
    }

    try {
      const response = await API.get(url, {
        cancelToken: new CancelToken(function executor(c) {
          cancelRequest = c;
        })
      });

      if (response?.data) {
        return response.data;
      }
    } catch (error) {
      if (error?.response) {
        console.error('Get repositories failed: ', error);
      }
    }
  }

  const searchRepos = ({ target }) => {
    const value = target.value;

    if (!value) {
      cancelRequest = null;
    }

    if (page !== 1) {
      setPage(1);
    }

    setSearchText(value);
    push({search: `?q=${value}&page=1`});
  }

  const handlePage = (event, value) => {
    cancelRequest = null;
    setPage(value);
    push({search: `?q=${seekText}&page=${value}`});
  };

  const clearResult = () => {
    cancelRequest = null;
    setPage(1);
    setSearchText("");
    push({search: ""});
  }

  return {
    isLoading,
    page,
    seekText,
    handlePage,
    clearResult,
    searchRepos,
    totalCount: Math.round(data?.total_count / PER_PAGE),
    listRepositories: data?.items
  }
}
