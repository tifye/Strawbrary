FROM node:17.9 As development
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install -g @nestjs/cli
RUN npm install --only=development
COPY . .
RUN npm run build
RUN npx prisma generate

FROM node:17.9 As production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
RUN npx prisma generate
COPY --from=development app/dist ./dist
CMD ["node", "dist/main"]