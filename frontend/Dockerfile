FROM node:16-alpine
WORKDIR /app/www/frontend

COPY package.json ./
RUN npm install 
COPY . .
RUN npm run build
RUN npm install -g serve

EXPOSE 80

CMD ["serve", "-s", "build", "-l", "80"]