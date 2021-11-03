setup:
	cd cm-server
	npm i
	cd ..

setup-server:
	cd cm-server
	npm i
	cd ..

build:
	docker-compose build

up:
	docker-compose up -d

u:
	docker-compose up

stop:
	docker-compose stop

down: 
	docker-compose down
