ARG NODE_VERSION

# --- Base Node ---
FROM node:${NODE_VERSION}-alpine as base

ENV ROOT_PATH /var/guava
ENV NODE_ENV production

RUN mkdir -p ${ROOT_PATH}
WORKDIR ${ROOT_PATH}

RUN mkdir -p library
RUN mkdir -p app

COPY ./package.json ./yarn.lock ./

COPY library/package.json ./library
COPY app/package.json ./app

# -- Dependencies --
FROM base as dependencies
RUN mkdir -p /var/yarn-cache

RUN yarn config set cache-folder /var/yarn-cache
RUN yarn install --pure-lockfile --production=false

# -- Source -- #

FROM dependencies as source

WORKDIR ${ROOT_PATH}
COPY . .

# -- Production -- #
FROM source as production

RUN yarn workspace @guava/app build

# -- Nginx server -- #

FROM nginx:alpine as server
COPY --from=production /var/guava/app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
