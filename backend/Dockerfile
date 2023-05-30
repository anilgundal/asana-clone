FROM node:18-alpine As builder
WORKDIR /backend
COPY package.json yarn.lock /
RUN yarn install --prod --frozen-lockfile --prefer-offline --no-progress
COPY . .

FROM node:18-alpine As production
ENV TZ=Europe/Istanbul
ENV IS_CONTAINER=1
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /backend

COPY --from=builder /backend/package.json /backend/yarn.lock /backend/.env /backend/
COPY --from=builder /backend/src /backend/src
COPY --from=builder /backend/node_modules /backend/node_modules

EXPOSE 3000

CMD [ "yarn", "start" ]