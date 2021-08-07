# ARG NODE_VERSION

# FROM node:${NODE_VERSION}-alpine



# RUN mkdir -p ${ROOT_PATH}
# WORKDIR ${ROOT_PATH}

# RUN mkdir -p library && mkdir -p app

# COPY library/package.json ./library/package.json
# COPY app/package.json ./app/package.json

# RUN yarn install --pure-lockfile --production



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

EXPOSE 8000
ENTRYPOINT [ "yarn" ]
CMD [ "start:app" ]