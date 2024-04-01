FROM node:16-alpine as build-step
WORKDIR /frontend
ENV PATH /frontend/node_modules/.bin:$PATH
COPY package.json .
RUN npm install
COPY ./src ./src
COPY ./public ./public
EXPOSE 3000
CMD ["npm", "start"]