import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Select, MenuItem } from "@material-ui/core";
import { searchArticles } from "../../actions/articleActions";
import axios from "axios";

const SearchPage = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchSources();
    fetchCategories();
  }, []);

  const fetchSources = async () => {
    try {
      const response = await axios.get("http://localhost/api/sources");
      setSources(response.data);
    } catch (error) {
      console.error("Error fetching sources:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSearch = () => {
    dispatch(searchArticles(keyword, date, category, source));
  };

  return (
    <div>
      <TextField
        label="Keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <Select value={category} onChange={(e) => setCategory(e.target.value)}>
        <MenuItem value="">All Categories</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
      <Select value={source} onChange={(e) => setSource(e.target.value)}>
        <MenuItem value="">All Sources</MenuItem>
        {sources.map((source) => (
          <MenuItem key={source.id} value={source.id}>
            {source.name}
          </MenuItem>
        ))}
      </Select>
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchPage;
