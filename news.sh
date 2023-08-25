#!/bin/bash

function _up() {
  docker-compose --env-file ./backend/.env up -d
}

function _recreate() {
  docker-compose --env-file ./backend/.env up -d --build --force-recreate --remove-orphans
}

function _down() {
  docker-compose --env-file ./backend/.env stop
}

function _init() {
  docker-compose --env-file ./backend/.env up --build -d
	docker-compose --env-file ./backend/.env exec backend php artisan migrate --seed
}

function _ssh() {
  docker-compose --env-file ./.env exec app bash
}

case $1 in
"start") _up ;;
"recreate") _recreate ;;
"down") _down ;;
"init") _init ;;
"ssh") _ssh ;;
esac