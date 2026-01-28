# syntax=docker/dockerfile:1
# check=error=true

# this is an multi stage docker file first part focus on the build and second part on the production stage
# build stage 
ARG BUILD_DATE
ARG VCS_REF

FROM node:22.22-bookworm-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci  &&  npm cache clean --force 

COPY . .

RUN npm run build

# production stage

LABEL org.opencontainers.image.created="${BUILD_DATE}" \
      org.opencontainers.image.revision="${VCS_REF}" 

FROM node:22.22-bookworm-slim AS production

# install security updates and required packages and delete cache for reduce size of the image 
RUN apt update && \ 
    apt upgrade -y && \ 
    apt install -y --no-install-recommends \
    dumb-init && \ 
    rm -rf /var/lib/apt/lists/*

# creating a non-root user for security and avoid giving full access by following concept principal of least privilege
RUN getent group node || groupadd -g 1001 node && \ 
    id -u nodejs || useradd -u 1001 -g node -s /usr/sbin/nologin nodejs

WORKDIR /app

COPY --chown=nodejs:node package*.json ./

RUN npm ci --only=production && \ 
   npm cache clean --force 

COPY --chown=nodejs:node --from=builder /app/dist ./dist

ENV NODE_ENV=production \
    PORT=3000 \
    NPM_CONFIG_LOGLEVEL=warn

USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=4s --start-period=35s --retries=3 \
        CMD node healthcheck.js || exit 1

 ENTRYPOINT ["dumb-init" , "--"]
 CMD ["node" , "dist/main.js"]      