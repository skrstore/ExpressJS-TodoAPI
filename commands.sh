echo "Building docker image -  1 ---"

REPO=express-todoapi

docker build -t $REPO .
