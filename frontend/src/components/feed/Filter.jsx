import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Button, TextField, Box, Chip } from "@mui/material";
import { loadSources } from "../../actions/sourceActions";
import { loadCategory } from "../../actions/categoryActions";
import {
  NOTIFICATION,
  LOADING_ON,
  LOADING_OFF,
  UPDATE_PREFERRRED_SETTINGS,
} from "../../utils/actionTypes";
import api from "../../services/api";

const FeedFilter = ({ setCurrentPage, getFeed, handleClose }) => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.profile.data);

  const [filterData, setFilterData] = useState({
    sources: userData.preferred_sources || [],
    categories: userData.preferred_categories || [],
    authors: userData.preferred_authors || [],
  });

  const sourceOptions = useSelector((state) => state.sources.sources);
  const categoryOptions = useSelector((state) => state.categories.categories);

  const handleMultiSelectChange = (fieldName, value) => {
    setFilterData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let authors = [];

    if (value.includes(", ")) {
      authors = value.split(", ").map((item) => item);
    } else if (value) {
      authors = [value];
    }

    // Filter out duplicate authors
    const uniqueAuthors = [...new Set(authors)];

    setFilterData((prevData) => ({
      ...prevData,
      [name]: uniqueAuthors,
    }));
  };

  const handleDeleteAuthor = (author) => {
    setFilterData((prevData) => ({
      ...prevData,
      authors: prevData.authors.filter((item) => item !== author),
    }));
  };

  const handleSubmit = async () => {
    setCurrentPage(1);
    handleClose();
    await updateFilterData();
    getFeed();
  };

  const updateFilterData = async () => {
    try {
      dispatch({ type: LOADING_ON });
      const response = await api.put("/user/feed", filterData);
      dispatch({ type: LOADING_OFF });
      dispatch({ type: NOTIFICATION, payload: response.data.message });
      dispatch({
        type: UPDATE_PREFERRRED_SETTINGS,
        payload: {
          ...userData,
          preferred_sources: filterData.sources,
          preferred_categories: filterData.categories,
          preferred_authors: filterData.authors,
        },
      });
    } catch (error) {
      dispatch({
        type: NOTIFICATION,
        payload: error.response ? error.response.data.message : error.message,
      });
      dispatch({ type: LOADING_OFF });
    }
  };

  useEffect(() => {
    dispatch(loadSources());
    dispatch(loadCategory());
  }, [dispatch]);

  return (
    <Box>
      <Autocomplete
        multiple
        name="sources"
        options={sourceOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Sources"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        )}
        value={filterData.sources}
        onChange={(event, value) => handleMultiSelectChange("sources", value)}
        sx={{ display: "inline-block", marginRight: "20px", width: "100%" }}
      />

      <Autocomplete
        multiple
        name="categories"
        options={categoryOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Categories"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        )}
        value={filterData.categories}
        onChange={(event, value) =>
          handleMultiSelectChange("categories", value)
        }
        sx={{ display: "inline-block", width: "100%" }}
      />

      <TextField
        name="authors"
        label="Authors"
        variant="outlined"
        fullWidth
        margin="normal"
        placeholder="Enter author name(s) separated by commas"
        value={filterData.authors.join(", ")} // Convert authors array to comma-separated string
        onChange={handleInputChange}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
          }
        }}
        InputProps={{
          endAdornment: (
            <>
              {filterData.authors.map((author) => (
                <Chip
                  key={author}
                  label={author}
                  onDelete={() => handleDeleteAuthor(author)}
                  color="primary"
                  variant="outlined"
                  sx={{ marginRight: "5px", marginBottom: "5px" }}
                />
              ))}
            </>
          ),
        }}
        sx={{ display: "inline-block", marginRight: "10px" }}
      />

      <Button
        onClick={() => {
          handleSubmit();
        }}
        variant="contained"
        color="primary"
        type="submit"
        sx={{ marginRight: "10px" }}
      >
        Apply Filters
      </Button>
      <Button
        onClick={handleClose}
        variant="contained"
        color="error"
        type="submit"
      >
        Cancel
      </Button>
    </Box>
  );
};

export default FeedFilter;
