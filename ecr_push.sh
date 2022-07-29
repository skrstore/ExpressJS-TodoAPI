echo "Building docker image -  1 ---"

REPO=node-server

docker build -t $REPO .

echo "Tagging  --------------  2  ----"

echo "Enter Version no. : "
read version

docker tag $REPO:latest 431795052832.dkr.ecr.ap-south-1.amazonaws.com/$REPO:$version
docker tag $REPO:latest 431795052832.dkr.ecr.ap-south-1.amazonaws.com/$REPO:latest

echo "Pushing ---------------  3  ----"

docker push 431795052832.dkr.ecr.ap-south-1.amazonaws.com/$REPO:$version
docker push 431795052832.dkr.ecr.ap-south-1.amazonaws.com/$REPO:latest
