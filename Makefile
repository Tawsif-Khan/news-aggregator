up:
	docker-compose --env-file ./backend/.env up -d

recreate:
	docker-compose --env-file ./backend/.env up -d --build --force-recreate --remove-orphans

init:
	docker-compose --env-file ./backend/.env up --build -d
	docker-compose --env-file exec backend php artisan migrate --seed
down:
	docker-compose --env-file ./backend/.env down

dbfresh:
	docker-compose --env-file ./backend/.env exec backend php artisan migrate:fresh --seed