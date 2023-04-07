

cd ..
cd ..
cd home/ec2-user/nodejs-aws-codedeploy-pipeline


sudo pm2 stop main.js --name=nodejs-express-a
sudo pm2 start main.js --name=nodejs-express-a

