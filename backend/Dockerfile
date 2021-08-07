ARG RUBY_VERSION
ARG BUNDLE_VERSION

FROM ruby:${RUBY_VERSION}-alpine as base

ENV APP_PATH /var/app
ENV TMP_PATH /tmp
ENV BUNDLE_PATH /usr/local/bundle/gems
ENV RAILS_LOG_TO_STDOUT true
ENV RAILS_PORT 3000

COPY ./dev-docker-entry.sh /usr/local/bin/dev-entrypoint.sh
RUN chmod +x /usr/local/bin/dev-entrypoint.sh

RUN apk add --update --virtual \
  runtime-deps \
  bash \
  postgresql-client \
  build-base \
  libxml2-dev \
  libxslt-dev \
  nodejs \
  yarn \
  libffi-dev \
  readline \
  build-base \
  postgresql-dev \
  sqlite-dev \
  libc-dev \
  linux-headers \
  readline-dev \
  file \
  imagemagick \
  git \
  tzdata \
  && rm -rf /var/cache/apk/*

RUN mkdir -p $APP_PATH

RUN gem install bundler --version "$BUNDLE_VERSION"
RUN rm -rf $GEM_HOME/cache/*

WORKDIR ${APP_PATH}
EXPOSE ${RAILS_PORT}

ENTRYPOINT [ "bundle", "exec" ]

FROM base as staging

ENV RAILS_ENV staging
ENV NODE_ENV production
ENV RAILS_SERVE_STATIC_FILES true

RUN bundle exec rails assets:precompile --trace

FROM staging as prod

ENV RAILS_ENV production
ENV NODE_ENV production
