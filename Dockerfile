FROM node:20.19-alpine AS deps
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile=false

FROM deps AS build
COPY tsconfig.json ./
COPY src src
RUN pnpm build

FROM node:20.19-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod --frozen-lockfile=false
COPY --from=build /app/dist dist
ENV HOST=0.0.0.0
ENV PORT=7003
EXPOSE 7003
CMD ["pnpm", "start"]
