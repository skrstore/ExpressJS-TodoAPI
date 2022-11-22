# ExpressJS-TodoAPI

## Notes

- Commands

```sh
bash commands.sh

docker images

docker run -p 8000:8000 -e NAME=ExpressJS-TodoAPI express-todoapi:latest

# - Create Folder for docker data
mkdir -p docker-data/mongodb_data

docker-compose up -d
```

- Environment Variables

```sh
# All are optional
NAME=ExpressJS-TodoAPI
PORT=8000
VERSION=
```

- Commands to Build Docker Images and Push to DockerHub

```sh
docker build -t skrmain/expressjs-todo-api .
docker tag skrmain/expressjs-todo-api:latest skrmain/expressjs-todo-api:0.1

# Docker Login

docker push skrmain/expressjs-todo-api:latest
docker push skrmain/expressjs-todo-api:0.1
```
