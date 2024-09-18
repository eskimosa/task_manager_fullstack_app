FROM node:18-alpine

WORKDIR /app

COPY ./frontend/task_manager/package.json ./frontend/task_manager/yarn.lock ./

# RUN yarn config set network-timeout 600000
# RUN yarn install --production --verbose

RUN yarn install

COPY ./frontend/task_manager .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]