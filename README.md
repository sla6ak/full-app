# full-app

1 express - для работы с запросами, обработка путей, многостраничность "/abc"
2 mongoose - синтаксис запросов к базе "монгоДБ" (npm install mongoose --save)
3 nodemon - по сути обычная нода но с флагом следить. перезапускает ноду при изменениях (npm install --save-dev nodemon)
4 councurrently - заставляет процессы работать только одновременно, ляжет один отключатся все. "start": "concurrently \"command1 arg\" \"command2 arg\"" (npm install concurrently --save-dev)
5 config - обычные переменные необходимые для управления неизменяемыми параметрами типа порта или админа (npm install config)
6 bcrypt - библиотека для хеширования пароля (https://www.npmjs.com/package/bcrypt)
7 express-validator - библиотека для бэкенд валидации полей(https://express-validator.github.io/docs/)

регистрирую кластер на монгоДБ => имя - Viktor, пароль - slabak1989, ip - 176.116.66.1/32
"mongodb+srv://Viktor:slabak1989@myapp.hwweftk.mongodb.net/?retryWrites=true&w=majority"
