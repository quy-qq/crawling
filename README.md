## Installation Run source

```bash
$ version node: V16.15.0
$ version npm:9.7.1
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## APIS

```bash
# crawling bye races
$ http://localhost:3000/crawl/crawling-type?year=2023&type=races

# crawling bye drivers
$ http://localhost:3000/crawl/crawling-type?year=2023&type=drivers

# crawling teams
$ http://localhost:3000/crawl/crawling-type?year=2023&type=team


#crawling race result, Currently race result only crawling 2023
$ http://localhost:3000/crawl/crawling-type?year=2023&type=races

# API Search by year, driver, team, race
$ http://localhost:3000/crawl?page=1&limit=20&keyword=RED%20BULL%20RACING%20HONDA%20RBPT

```

## DOCAPI

```bash

# Để hiểu ra hơn trực quan hơn về API thì em đã làm cái DocApi bằng swagger để cho a chị tiện xem, sau khi clone src về và run xong thì a chị có thể mở link này
$ http://localhost:3000/api


```
