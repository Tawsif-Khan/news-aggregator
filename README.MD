## News Aggregator

The News Aggregator is a web application that allows users to view articles from multiple sources in a clean and easy-to-read format. The app includes user authentication, article search and filtering, and personalized news feeds. It has been designed to be mobile-responsive, providing a seamless experience across different devices.

### Tech Stack

The News Aggregator is built using the following technologies:

- Laravel: A PHP framework for building robust and scalable web applications.
- MySQL: A relational database management system used to store application data.
- React.js: A JavaScript library for building user interfaces, used for the frontend development.

### Prerequisites

Before running the News Aggregator, ensure that you have the following software installed on your machine:

- PHP 8.1
- Node.js version 14 or above
- MySQL
- Docker

### Environment Setup

To set up the environment and run the News Aggregator application, follow these steps:

1. Clone the repository to your local machine.
2. Open the terminal and navigate to the root directory of the repository.
3. Copy the `.env.example` file to `.env` in the `./backend` directory.
4. Configure the necessary settings and API keys for the data sources in the `.env` file. You will need API keys from the following sources:
   - [NewsAPI](https://newsapi.org)
   - [The Guardian](https://open-platform.theguardian.com)
   - [New York Times](https://developer.nytimes.com/apis)
5. Run the following command to build and start the environment using Docker Compose:

   ```bash
   docker-compose --env-file ./backend/.env up --build -d
   ```

6. Run the following command to run the database migrations and seed the database with initial data:

   ```bash
   docker-compose --env-file ./backend/.env exec backend php artisan migrate --seed
   ```

7. Run the following commands to start fetching news from different sources:

   ```bash
   docker-compose --env-file ./backend/.env exec backend php artisan fetch-news:newsapi
   docker-compose --env-file ./backend/.env exec backend php artisan fetch-news:nytimes
   docker-compose --env-file ./backend/.env exec backend php artisan fetch-news:theguardian
   ```

   These commands will fetch news articles from NewsAPI, New York Times, and The Guardian respectively.

8. Run the following command to run the news fetching API in the background:

   ```bash
   docker-compose --env-file ./backend/.env run --detach backend php artisan schedule:work
   ```

   This will ensure that news articles are continuously fetched in the background.

9. Access the News Aggregator application in your browser at [http://localhost](http://localhost).

### Additional Commands

- To stop the environment, run the following command:

  ```bash
  docker-compose --env-file ./backend/.env stop
  ```

- To refresh the database, run the following command:

  ```bash
  docker-compose --env-file ./backend/.env exec backend php artisan migrate:fresh --seed
  ```

### Data Sources

The News Aggregator relies on the following data sources to fetch articles:

- [NewsAPI](https://newsapi.org)
- [The Guardian](https://open-platform.theguardian.com)
- [New York Times](https://developer.nytimes.com/apis)

### Functionality

The News Aggregator provides the following features:

- User authentication and registration
- Article search and filtering
- Personalized news feed based on user preferences
- Mobile-responsive design for optimal viewing experience across devices
