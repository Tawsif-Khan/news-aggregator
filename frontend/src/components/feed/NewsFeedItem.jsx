import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import NoImage from "../../assets/images/404.jpg";

const NewsFeedItem = ({
  id,
  title,
  description,
  date,
  image,
  author,
  source,
  url,
}) => {
  return (
    <Grid item xs={12} sm={6} md={4} key={id}>
      <Card variant="outlined" sx={{ height: "100%" }}>
        <CardMedia
          component="img"
          height="140"
          image={image ? image : NoImage}
          alt={title}
        />
        <CardContent>
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, maxHeight: 80, overflow: "hidden" }}
          >
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Date: {date}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Author: {author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Source: {source}
          </Typography>
          <Button
            component={Link}
            to={url}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="primary"
            size="small"
            sx={{ mt: 2 }}
          >
            Read More
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default NewsFeedItem;
