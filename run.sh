#!/bin/sh
npm run build
npx prisma generate
npx prisma migrate dev --name init
npx prisma db push
npm run start