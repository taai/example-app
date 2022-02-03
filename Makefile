docker-build-prod:
	@echo "Building Docker image for production"
	docker build -f Dockerfile.prod -t taai/example-app .

.PHONY: docker-build-prod
