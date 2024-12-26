FROM node:18-bullseye-slim

# Install system dependencies
RUN apt-get update && \
    apt-get install -y \
    python3 \
    python3-pip \
    build-essential \
    git \
    pkg-config \
    && ln -s /usr/bin/python3 /usr/bin/python \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Enable Corepack and set environment variables
ENV NODE_ENV=production
ENV PYTHON=/usr/bin/python3
RUN corepack enable && corepack prepare yarn@stable --activate

# Copy configuration files first
COPY .yarnrc.yml ./
COPY package.json ./

# Install dependencies with specific flags for better-sqlite3
RUN CFLAGS='-DSQLITE_ENABLE_COLUMN_METADATA=1' yarn install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Start the application
CMD ["yarn", "ponder:start"]