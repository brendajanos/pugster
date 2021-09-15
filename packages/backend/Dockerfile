FROM node:14 as builder
WORKDIR /usr/src
COPY packages/backend ./
RUN yarn && yarn add typescript -g
RUN yarn build

FROM node:14 as runtime
WORKDIR /usr/src 
ENV NODE_ENV=production
COPY --from=builder /usr/src/package.json ./package.json
COPY --from=builder /usr/src/yarn.lock ./yarn.lock
COPY --from=builder /usr/src/build ./build
RUN yarn install --frozen-lockfile

ENTRYPOINT [ "yarn","start" ]