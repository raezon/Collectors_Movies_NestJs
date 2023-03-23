#!/bin/bash

cd /home/ec2-user/nodejs-aws-codedeploy-pipeline
echo 'npm install' >> /home/ec2-user/nodejs-aws-codedeploy-pipeline/deploy.log 
pwd > home/ec2-user/nodejs-aws-codedeploy-pipeline/pwd.log
npm install >> /home/ec2-user/nodejs-aws-codedeploy-pipeline/deploy.log
npm run build
npx prisma migrate dev
npx prisma generate

