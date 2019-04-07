## Создание базы данных:

```sh
psql -c "create user gorod with password '123qwe'" postgres
psql -c "create database test_task_mtc owner gorod encoding 'UTF8' lc_collate 'ru_RU.UTF-8' LC_CTYPE 'ru_RU.UTF-8' template template0;" postgres
```
## Версия node js:
node 8.11.2
## Версия yarn:
yarn v1.9.4

## Разворачивание проекта

Установка зависимостей

```sh
yarn install
```
Запуск миграций

```sh
yarn migrate
```

Запуск Redis

```sh
redis-server
```

Запуск приложения

```sh
yarn start
```
http://localhost:3000/
apiDoc: http://localhost:3000/api


## Скрипты и команды

Запуск приложения в dev режиме, приложение перезапускается при изменении файлов

```sh
yarn start:dev
```

Миграции

```sh
yarn migrate //накатить миграции

yarn migrate-undo //откатить миграции

typeorm migrations:create -n MIGRATION_NAME //генерирует новый файл миграции typeorm должен быть установлен глобально и запускаться из той директории,где нужно сгенерировать файл миграции
```

```

```