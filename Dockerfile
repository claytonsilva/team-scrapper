# Build Stage 1
# This build created a staging docker image
#
FROM node:12.18.1-alpine as development
WORKDIR /usr/src/app
COPY . .
COPY src src
RUN yarn install
RUN yarn run build
# Build Stage 2
# This build takes the production build from staging build
#
FROM node:12.18.1-alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn install --production
COPY --from=development /usr/src/app/dist ./dist
EXPOSE 3000
CMD npm start
