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
ENV PORT=42069
ENV LENS_RPC_URL=https://rpc.testnet.lens.dev
ENV PONDER_RPC_URL_37111=https://rpc.testnet.lens.dev

RUN corepack enable && corepack prepare yarn@stable --activate

# Create and set permissions for SQLite directory
RUN mkdir -p .ponder/sqlite && chmod -R 777 .ponder

# Copy configuration files first
COPY .yarnrc.yml ./
COPY package.json ./

# Install dependencies
RUN CFLAGS='-DSQLITE_ENABLE_COLUMN_METADATA=1' yarn install

# Copy the rest of the application
COPY . .

# Ensure SQLite directory exists and has proper permissions after copy
RUN mkdir -p .ponder/sqlite && chmod -R 777 .ponder

# Expose the port
EXPOSE ${PORT}

# Start the application
CMD ["yarn", "ponder:start"]