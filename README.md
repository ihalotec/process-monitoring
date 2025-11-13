# Process Monitoring Dashboard

A comprehensive dashboard for monitoring truck movements through gate in/out stations and weighing bridge operations.

## Screenshots

### Main Dashboard
<div align="center">
<img src="screenshoot/dashboard.png" alt="Dashboard Overview" width="1200"/>
</div>

### Transaction Details Modal
<div align="center">
<img src="screenshoot/modal.png" alt="Transaction Details Modal" width="800"/>
</div>

## Features

- Real-time monitoring of Gate In, Gate Out, and Weighing Bridge stations
- Live camera feeds and transaction images
- Truck activity tracking and status updates
- Responsive design for desktop and mobile devices
- Docker support for easy deployment

## Quick Start

### Using Docker (Recommended)

1. Build and run with Docker Compose:
   ```bash
   docker-compose up --build
   ```

2. Access the dashboard at: http://localhost:3111

### Local Development

**Prerequisites:** Node.js and pnpm

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the development server:
   ```bash
   pnpm run dev
   ```

3. Open your browser and navigate to: http://localhost:3000

## Project Structure

- `src/components/` - React components for the dashboard
- `src/types.ts` - TypeScript type definitions
- `src/constants.ts` - Initial station and activity data
- `Dockerfile` - Docker configuration for production deployment
- `docker-compose.yml` - Docker Compose configuration
- `nginx.conf` - Nginx configuration for production serving

## Docker Deployment

The application is containerized using a multi-stage Docker build:

1. **Builder Stage**: Builds the React application using Node.js and pnpm
2. **Production Stage**: Serves the built application using Nginx

To deploy:

```bash
# Build the image
docker build -t process-monitoring-dashboard .

# Run the container
docker run -p 3111:80 process-monitoring-dashboard
```

## Configuration

The dashboard simulates real-time truck activity with:
- Automatic status updates every 5 seconds
- Random truck images for gate stations and heavy equipment for weighing bridges
- Dynamic activity generation and tracking
- Weight measurements for weighing bridge stations

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Deployment**: Docker with Nginx
- **Package Manager**: pnpm