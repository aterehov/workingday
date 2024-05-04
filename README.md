# Рабочий День
Терехов Артем, группа БПИ214

Демонстрация: [Рабочий День](https://working-day.ru)

Данная работа выполнена в рамках курсового проекта "Фронтенд для упрощенной социальной сети между работниками внутри компании".

## Функционал
- Просмотр и изменение личной страницы пользователя
- Поиск коллег
- Уведомления для сотрудников
- Просмотр и подписание документов
- Личный календарь сотрудника

Для роли табельщика:
- Ведение учета рабочего времени

Для роли бухгалтера:
- Просмотр информации о рабочем времени за месяц
- Отправка документов сотрудникам
- Просмотр информации по отправленным документам

## Сборка и развертывание
Для сборки необходимо:
1. [Установить Node.js](https://nodejs.org/en/download) (при создании проекта использовалась версия 20.9.0)
2. Загрузить исходный код проекта
3. Открыть папку проекта в командной строке и выполнить установку зависимостей с помощью команды `npm install`
4. Выполнить сборку проекта с помощью команды `npm run build`

Для развертывания проекта необходимо:
1. Скопировать файлы из папки build в папку для размещения файлов сайта на сервере;
Если папка build отсутствует, выполните сборку проекта
2. Настроить сервер так, чтобы для всех запросов по несуществующим на сервере путям он возвращал index.html (не перенаправлял на него, а именно возвращал файл)

По умолчанию пользователи смогут просматривать исходный код сайта через инструменты разработчика. Чтобы отключить эту возможность, удалите с сервера map-файлы. 
