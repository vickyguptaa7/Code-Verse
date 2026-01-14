.PHONY: help dev dev-build dev-down dev-logs prod prod-build prod-down prod-logs clean

# Default target
help:
	@echo "Code Verse Backend - Docker Commands"
	@echo ""
	@echo "Development (with hot reloading):"
	@echo "  make dev          - Start development server with hot reloading"
	@echo "  make dev-build    - Build and start development server"
	@echo "  make dev-down     - Stop development server"
	@echo "  make dev-logs     - View development server logs"
	@echo ""
	@echo "Production:"
	@echo "  make prod         - Start production server"
	@echo "  make prod-build   - Build and start production server"
	@echo "  make prod-down    - Stop production server"
	@echo "  make prod-logs    - View production server logs"
	@echo ""
	@echo "Utility:"
	@echo "  make clean        - Remove all containers and images"
	@echo "  make status       - Show running containers"

# ==================== Development Commands ====================

# Start development server (builds if image doesn't exist)
dev:
	docker-compose up backend-dev

# Build and start development server
dev-build:
	docker-compose up --build backend-dev

# Stop development server
dev-down:
	docker-compose down

# View development logs
dev-logs:
	docker-compose logs -f backend-dev

# ==================== Production Commands ====================

# Start production server (builds if image doesn't exist)
prod:
	docker-compose up -d backend-prod

# Build and start production server
prod-build:
	docker-compose up --build -d backend-prod

# Stop production server
prod-down:
	docker-compose down

# View production logs
prod-logs:
	docker-compose logs -f backend-prod

# ==================== Utility Commands ====================

# Remove all containers and images
clean:
	docker-compose down --rmi all --volumes --remove-orphans

# Show running containers
status:
	docker-compose ps
