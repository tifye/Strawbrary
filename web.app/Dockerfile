FROM node:17.9 As development
WORKDIR /app
COPY package*.json ./
RUN npm install -g @nestjs/cli
RUN npm install --only=development
COPY . .
RUN npm run build

FROM node:17.9 As production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=development app/dist ./dist
CMD ["node", "dist/main"]