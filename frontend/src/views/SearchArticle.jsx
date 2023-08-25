import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Button,
  Typography,
  Alert,
  TextField,
  Autocomplete,
} from "@mui/material";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import { loadSources } from "../actions/sourceActions";
import { loadCategory } from "../actions/categoryActions";
import NewsFeedItem from "../components/feed/NewsFeedItem";
import CustomPagination from "../components/pagination/Pagination";
import api from "../services/api";
import { NOTIFICATION, LOADING_ON, LOADING_OFF } from "../utils/actionTypes";

const SearchArticle = () => {
  const dispatch = useDispatch();

  const [news, setNews] = useState({});

  const sourceOptions = useSelector((state) => state.sources.sources);
  const categoryOptions = useSelector((state) => state.categories.categories);

  const [submitSearch, setSubmitSearch] = useState(false);
  const [moreFilter, setMoreFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    keyword: "",
    fromDate: "",
    toDate: "",
    category: "",
    source: "",
  });

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const searchNews = async () => {
    if (filters.keyword === "") {
      dispatch({ type: NOTIFICATION, payload: "Keyword is required" });
      return;
    }
    try {
      dispatch({ type: LOADING_ON });
      const response = await api.get("/search-news", {
        params: { ...filters, page: currentPage },
      });
      dispatch({ type: LOADING_OFF });
      setSubmitSearch(true);
      setNews(response.data);
    } catch (error) {
      dispatch({
        type: NOTIFICATION,
        payload: error.response ? error.response.data.message : error.message,
      });
      dispatch({ type: LOADING_OFF });
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    searchNews();
  };

  const handleMoreFilter = () => {
    setMoreFilter(!moreFilter);
  };

  useEffect(() => {
    dispatch(loadSources());
    dispatch(loadCategory());
    if (filters.keyword !== "") {
      searchNews();
    }
  }, [dispatch, currentPage]);

  return (
    <PageContainer title="Article search" description="Article search">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Article search">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Keyword"
                  variant="outlined"
                  fullWidth
                  name="keyword"
                  value={filters.keyword}
                  onChange={(event) => {
                    setFilters({ ...filters, keyword: event.target.value });
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  sx={{ height: "100%" }}
                  fullWidth
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  color="info"
                  variant="contained"
                  size="large"
                  sx={{ height: "100%" }}
                  fullWidth
                  onClick={handleMoreFilter}
                >
                  More filters
                </Button>
              </Grid>
              {moreFilter && (
                <>
                  <Grid item xs={12} sm={3}>
                    <Autocomplete
                      name="sources"
                      options={sourceOptions}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Sources"
                          variant="outlined"
                          fullWidth
                        />
                      )}
                      value={filters.source}
                      onChange={(event, value) =>
                        setFilters({ ...filters, source: value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Autocomplete
                      name="category"
                      options={categoryOptions}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Category"
                          variant="outlined"
                          fullWidth
                        />
                      )}
                      value={filters.category}
                      onChange={(event, value) =>
                        setFilters({ ...filters, category: value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="From Date"
                      variant="outlined"
                      fullWidth
                      type="date"
                      name="fromDate"
                      value={filters.fromDate}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(event) =>
                        setFilters({ ...filters, fromDate: event.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="To Date"
                      variant="outlined"
                      fullWidth
                      type="date"
                      name="toDate"
                      value={filters.toDate}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(event) =>
                        setFilters({ ...filters, toDate: event.target.value })
                      }
                    />
                  </Grid>
                </>
              )}
            </Grid>
            {news.data && news.data.length > 0 ? (
              <>
                <Typography sx={{ mt: 4, mb: 1 }}>
                  About {news.total} results
                </Typography>
                <Grid container spacing={3}>
                  {news.data.map((article, index) => (
                    <NewsFeedItem
                      key={index}
                      title={article.title}
                      description={article.description}
                      date={article.published_at}
                      image={article.image_url}
                      author={article.author}
                      source={article.source}
                      url={article.url}
                    />
                  ))}
                </Grid>
                <CustomPagination
                  currentPage={currentPage}
                  lastPage={news.last_page}
                  onPageChange={onPageChange}
                />
              </>
            ) : submitSearch ? (
              <Alert sx={{ mt: 4 }} severity="info">
                Your search did not match any documents.
              </Alert>
            ) : null}
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default SearchArticle;
