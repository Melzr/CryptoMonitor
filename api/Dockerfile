FROM node:16
WORKDIR /app

COPY package.* ./
RUN npm install
COPY . .

RUN npm install

CMD ["npm", "run", "start"]
