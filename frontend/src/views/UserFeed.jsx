import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Button, Modal, Box, Typography, Alert } from "@mui/material";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import NewsFeedItem from "../components/feed/NewsFeedItem";
import FeedFilter from "../components/feed/Filter";
import CustomPagination from "../components/pagination/Pagination";
import { NOTIFICATION, LOADING_ON, LOADING_OFF } from "../utils/actionTypes";
import api from "../services/api";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 10,
  p: 4,
};

const Feed = () => {
  const dispatch = useDispatch();

  const [feeds, setFeeds] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getFeed = async () => {
    try {
      dispatch({ type: LOADING_ON });
      const response = await api.get("/user/feed", {
        params: { page: currentPage },
      });
      setFeeds(response.data);
      dispatch({ type: LOADING_OFF });
    } catch (error) {
      dispatch({
        type: NOTIFICATION,
        payload: error.response ? error.response.data.message : error.message,
      });
      dispatch({ type: LOADING_OFF });
    }
  };

  useEffect(() => {
    getFeed();
  }, [currentPage]);

  return (
    <PageContainer title="News feed" description="News feed">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard
            title="News feed"
            action={
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenModal}
              >
                Filter
              </Button>
            }
          >
            {feeds.data && feeds.data.length > 0 ? (
              <>
                <Grid container spacing={3}>
                  {feeds.data.map((article, index) => (
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
                  lastPage={feeds.last_page}
                  onPageChange={onPageChange}
                />
              </>
            ) : (
              <Alert sx={{ mt: 4 }} severity="info">
                No feeds available.
              </Alert>
            )}
          </DashboardCard>
        </Grid>
      </Grid>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Filter news feed
          </Typography>
          <FeedFilter
            setCurrentPage={setCurrentPage}
            getFeed={getFeed}
            handleClose={handleCloseModal}
          />
        </Box>
      </Modal>
    </PageContainer>
  );
};

export default Feed;
