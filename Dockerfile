FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to optimize build cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# If you're using Prisma, generate the Prisma client
RUN npx prisma generate

# Run the build process
RUN npm run build

# Expose the port your app will run on
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
