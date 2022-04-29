FROM node:18.0 As development
WORKDIR /app
COPY *.json ./
RUN npm install --force
COPY . ./
CMD ["npm", "run", "start"]
