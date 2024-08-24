FROM node:20-alpine


WORKDIR /usr/src/app

COPY package*.json ./


COPY ./prisma .


RUN npm ci


RUN npx prisma generate


COPY . .

ENV DATABASE_URL="mongodb+srv://challchutikrputtar:zxcvbzxcvb@cluster0.bfanczq.mongodb.net/chatApp?retryWrites=true&w=majority"

ENV KAFKA_BROKER="loved-gazelle-9843-us1-kafka.upstash.io:9092"

ENV KAFKA_USERNAME="bG92ZWQtZ2F6ZWxsZS05ODQzJBQvajsiOzos2HkfN0kvl3G0HuegfwVkwF5FCwo"

ENV KAFKA_MECHANISM="scram-sha-256"

ENV KAFKA_PASSWORD="MzI3NzQ2ZjYtZDRiMS00YWI1LWJiM2QtMzZkYWFjZTFlNzVk"

ENV REDIS_URL="rediss://default:AcgiAAIjcDFhZjFhOWYzODM3MWM0YTQ0Yjk2MWFkZmZmMmVhN2UzNnAxMA@first-narwhal-51234.upstash.io:6379"



RUN npm run build


EXPOSE 3001

CMD ["npm", "start"]





