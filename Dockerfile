# Stage 2: Runtime
FROM node:22.20-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm install
COPY . .
EXPOSE 3000
ENV PORT=3000
CMD ["pnpm", "run", "dev"]