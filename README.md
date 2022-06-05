# full-app

Есть любопытная возможность добавить авторизацию в любое приложение просто встроив готовую библиотеку - выглядит просто (https://auth0.com/docs/quickstart/spa)
в рамках данной задачи необходимо пощупать подводные камни руками!

1 express - для работы с запросами, обработка путей, многостраничность "/abc" (https://www.npmjs.com/package/express)

2 mongoose - синтаксис запросов к базе "монгоДБ" (https://mongoosejs.com/docs/guide.html)

3 nodemon - по сути обычная нода но с флагом следить. перезапускает ноду при изменениях (https://github.com/remy/nodemon#nodemon)

4 councurrently - заставляет процессы работать только одновременно, ляжет один отключатся все. "start": "concurrently \"command1 arg\" \"command2 arg\"" (https://www.npmjs.com/package/concurrently)

5 config - обычные переменные необходимые для управления неизменяемыми параметрами типа порта или админа (https://www.npmjs.com/package/config)

6 bcrypt - библиотека для хеширования пароля (https://www.npmjs.com/package/bcrypt)

7 express-validator - библиотека для бэкенд валидации полей(https://express-validator.github.io/docs/)

8 jsonwebtoken - создание токена для взаимодействия с клиентом (https://www.npmjs.com/package/jsonwebtoken)

9 cors - миделвеер для добавления заголовка к серверу для доступности сервера с разных ресурсов (https://expressjs.com/en/resources/middleware/cors.html)

10 @types/express - позволяет ноде распознавать експресс модули (https://www.npmjs.com/package/@types/express)

11 body-parser - миделвеер - анализатор тела превращает JSON в объект (https://www.npmjs.com/package/body-parser)

mongoDB - База данных где то заграницей (https://cloud.mongodb.com)
регистрирую кластер на монгоДБ => имя - Viktor, пароль - slabak1989, ip - 176.116.66.1/32
"mongodb+srv://Viktor:slabak1989@myapp.hwweftk.mongodb.net/?retryWrites=true&w=majority"
mongodb+srv://Viktor:slabak1989@myapp.hwweftk.mongodb.net/test
