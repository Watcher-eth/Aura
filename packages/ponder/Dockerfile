FROM node:18-bullseye

# Install Python and build dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    build-essential \
    && ln -s /usr/bin/python3 /usr/bin/python

WORKDIR /app

# Enable and prepare Corepack for Yarn
RUN corepack enable && corepack prepare yarn@stable --activate

# Copy yarn and package files
COPY .yarnrc.yml ./
COPY package.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application
COPY . .

# Start the application
CMD ["yarn", "ponder:start"]