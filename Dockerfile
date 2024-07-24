# build application
FROM node:lts-alpine3.15 AS base
WORKDIR /home/node

FROM base AS dev
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev --legacy-peer-deps
ENV NODE_ENV=development
COPY --chown=node:node . .
USER node
CMD npm run start


FROM base AS builder
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev --legacy-peer-deps
ENV NODE_ENV=production
USER node
COPY --chown=node:node . .
RUN npm run build

# serve only compiled app with nginx
FROM nginx:1.22 AS prod
EXPOSE 80
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /home/node/build/ /usr/share/nginx/html
