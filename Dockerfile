# build application
FROM node:lts-alpine3.15 AS base
WORKDIR /home/node
ARG REACT_APP_LOCAL_URL
ENV REACT_APP_LOCAL_URL=$REACT_APP_LOCAL_URL

FROM base AS dev

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn \
    yarn install --frozen-lockfile

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache    

ENV NODE_ENV=development

COPY --chown=node:node . .

CMD yarn run start



FROM base AS builder

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn \
    yarn install --frozen-lockfile --production

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

ENV NODE_ENV=production

COPY --chown=node:node . .

RUN yarn run build



# serve only compiled app with nginx
FROM nginx:1.22 AS prod

EXPOSE 80

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /home/node/build/ /usr/share/nginx/html
