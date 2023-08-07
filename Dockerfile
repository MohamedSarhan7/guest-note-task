FROM node:16-alpine

WORKDIR /app

COPY package.json ./

RUN npm install
COPY . .
COPY ./prisma/schema.prisma ./prisma/schema.prisma
RUN npx prisma generate
# RUN npx prisma db push

# CMD ["npm", "start"]
CMD source run.sh