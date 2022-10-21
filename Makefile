i:
	npm i

prebuild:
	npm runprebuild

build:
	npm run build

format:
	npm run format

start:
	npm run start

dev:
	npm run start:dev

debug:
	npm run start:debug

prod:
	npm run start:prod

lint:
	npm run lint

test_unit:
	npm run test

test_watch:
	npm run test:watch

coverage:
	npm run test:cov

test_debug:
	npm run test:debug

test_e2e:
	npm run test:e2e

docker-compose:
	docker compose up -d