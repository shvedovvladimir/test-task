## Создание базы данных:

```sh
psql -c "create user gorod with password '123qwe'" postgres
psql -c "create database test_task_mtc owner gorod encoding 'UTF8' lc_collate 'ru_RU.UTF-8' LC_CTYPE 'ru_RU.UTF-8' template template0;" postgres
```
