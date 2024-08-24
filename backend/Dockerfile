FROM node:20-alpine


WORKDIR /usr/src/app

COPY package*.json ./


COPY ./prisma .


RUN npm ci


RUN npx prisma generate


COPY . .

ENV DATABASE_URL=""

ENV KAFKA_BROKER=""

ENV KAFKA_USERNAME=""

ENV KAFKA_MECHANISM="scram-sha-256"

ENV KAFKA_PASSWORD=""

ENV REDIS_URL=""



RUN npm run build


EXPOSE 3001

CMD ["npm", "start"]





