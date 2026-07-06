# Change the old version tag to v1.60.0-jammy
FROM mcr.microsoft.com/playwright:v1.60.0-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy package management files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy your actual test source code into the image!
COPY . .

# Set up the environment directory variable for Allure
ENV ALLURE_RESULTS_DIR=/shared-results

# Default command
CMD ["npx", "playwright", "test"]