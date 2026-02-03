# MovieBox Docker Deployment

## Build and Run with Docker

### Build the Docker image:
```bash
docker build -t moviebox:latest .
```

### Run the container:
```bash
docker run -p 3000:3000 -v $(pwd)/cache:/app/cache moviebox:latest
```

### Or use Docker Compose:
```bash
docker-compose up -d
```

## Environment Variables

Create a `.env.local` file (optional):
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Volume Mounting

The `/app/cache` directory is mounted to persist the local database cache across container restarts.

## Ports

- Application runs on port 3000
- Map to different host port if needed: `-p 8080:3000`

## Docker Commands

### View logs:
```bash
docker logs -f moviebox
```

### Stop container:
```bash
docker-compose down
```

### Rebuild:
```bash
docker-compose up -d --build
```

## Production Deployment

For production, update `NEXT_PUBLIC_BASE_URL` to your domain:
```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_BASE_URL=https://yourdomain.com \
  -v /path/to/cache:/app/cache \
  moviebox:latest
```
