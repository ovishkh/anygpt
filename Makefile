.PHONY: install dev build db-push lint test

install:
	npm install

dev:
	npm run dev

build:
	npm run build

db-push:
	npx prisma db push

lint:
	npm run lint

test:
	npm test
