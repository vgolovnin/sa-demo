FROM node:10 AS frontend

WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]