#!/bin/bash

cd /home/ec2-user/nodejs-aws-codedeploy-pipeline
echo 'npm install' >> /home/ec2-user/nodejs-aws-codedeploy-pipeline/deploy.log 
npm install >> /home/ec2-user/nodejs-aws-codedeploy-pipeline/deploy.log

#Getting the branch_name
BRANCH_NAME=$(cat envfile)
echo "Starting application with branches: $BRANCH_NAME"

#Begginging env
sudo touch .env
PARAMETER_NAME="/${BRANCH_NAME}/DATABASE_URL"
echo "$PARAMETER_NAME"
CHECK="/${BRANCH_NAME}/check"
DATABASE_URL=$(aws ssm get-parameter  --name "$PARAMETER_NAME" --region eu-west-3  --query "Parameter.Value" --output text)
CHECK=$(aws ssm get-parameter --name "$CHECK" --region eu-west-3 --query "Parameter.Value" --output text)
JWT_ACCESS_TOKEN_TTL=$(aws ssm get-parameter   --name "JWT_ACCESS_TOKEN_TTL" --region eu-west-3 --query "Parameter.Value" --output text)
JWT_SECRET=$(aws ssm get-parameter --name "JWT_SECRET" --region eu-west-3  --query "Parameter.Value" --output text)
JWT_TOKEN_AUDIENCE=$(aws ssm get-parameter --name "JWT_TOKEN_AUDIENCE" --region eu-west-3 --query "Parameter.Value" --output text)
JWT_TOKEN_ISSUER=$(aws ssm get-parameter --name "JWT_TOKEN_ISSUER" --region eu-west-3 --query "Parameter.Value" --output text)
echo "$DATABASE_URL"
# Export the parameter value as an environment variable
 DATABASE_URL="$DATABASE_URL"
 JWT_ACCESS_TOKEN_TTL="$JWT_ACCESS_TOKEN_TTL"
 JWT_SECRET="$JWT_SECRET"
 JWT_TOKEN_AUDIENCE="$JWT_TOKEN_AUDIENCE"
 JWT_TOKEN_ISSUER="$JWT_TOKEN_ISSUER"
sudo rm .env
printf "DATABASE_URL=%s\nJWT_ACCESS_TOKEN_TTL=%s\nJWT_SECRET=%s\nJWT_TOKEN_AUDIENCE=%s\nJWT_TOKEN_ISSUER=%s\n" "$DATABASE_URL" "$JWT_ACCESS_TOKEN_TTL" "$JWT_SECRET" "$JWT_TOKEN_AUDIENCE" "$JWT_TOKEN_ISSUER">> .env
sudo chmod +rw .env
#Ending env
npm run build


