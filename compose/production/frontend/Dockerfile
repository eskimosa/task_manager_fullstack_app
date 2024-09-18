FROM node:18-alpine

WORKDIR /app

COPY ./frontend/task_manager/package.json ./frontend/task_manager/yarn.lock ./

RUN yarn install

COPY ./frontend/task_manager .

RUN yarn build

# Stage 2: Serve the React application with Nginx
#FROM nginx:alpine

#COPY --from=build /app/build /usr/share/nginx/html

#COPY compose/production/nginx/nginx.conf /etc/nginx/conf.d/default.conf

#EXPOSE 80