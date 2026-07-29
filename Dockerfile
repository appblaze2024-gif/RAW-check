FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY . .

# Build client
WORKDIR /app/client
RUN npm install
RUN npm run build

# Go back to root
WORKDIR /app

# Expose port
EXPOSE 5000 3000

# Start both servers
CMD ["npm", "run", "dev"]
