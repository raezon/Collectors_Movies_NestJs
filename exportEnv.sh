#Begginging env
sudo touch .env
BRANCH_NAME=$(curl https://factory-env-files.s3.eu-west-3.amazonaws.com/exported_env_vars.txt)
echo "Deploying branch: $BRANCH_NAME "


PARAMETER_NAME="/${BRANCH_NAME}/DATABASE_URL"
CHECK="/${BRANCH_NAME}/check"
DATABASE_URL=$(aws ssm get-parameter  --name "$PARAMETER_NAME" --region eu-west-3  --query "Parameter.Value" --output text)
CHECK=$(aws ssm get-parameter --name "$CHECK" --region eu-west-3 --query "Parameter.Value" --output text)
JWT_ACCESS_TOKEN_TTL=$(aws ssm get-parameter   --name "JWT_ACCESS_TOKEN_TTL" --region eu-west-3 --query "Parameter.Value" --output text)
JWT_SECRET=$(aws ssm get-parameter --name "JWT_SECRET" --region eu-west-3  --query "Parameter.Value" --output text)
JWT_TOKEN_AUDIENCE=$(aws ssm get-parameter --name "JWT_TOKEN_AUDIENCE" --region eu-west-3 --query "Parameter.Value" --output text)
JWT_TOKEN_ISSUER=$(aws ssm get-parameter --name "JWT_TOKEN_ISSUER" --region eu-west-3 --query "Parameter.Value" --output text)
echo "$DATABASE_URL"
# Export the parameter value as an environment variable
export DATABASE_URL="$DATABASE_URL"
export JWT_ACCESS_TOKEN_TTL="$JWT_ACCESS_TOKEN_TTL"
export JWT_SECRET="$JWT_SECRET"
export JWT_TOKEN_AUDIENCE="$JWT_TOKEN_AUDIENCE"
export JWT_TOKEN_ISSUER="$JWT_TOKEN_ISSUER"
export check="$CHECK"
sudo rm .env
printf "DATABASE_URL=%s\nJWT_ACCESS_TOKEN_TTL=%s\nJWT_SECRET=%s\nJWT_TOKEN_AUDIENCE=%s\nJWT_TOKEN_ISSUER=%s\ncheck=%s\n" "$DATABASE_URL" "$JWT_ACCESS_TOKEN_TTL" "$JWT_SECRET" "$JWT_TOKEN_AUDIENCE" "$JWT_TOKEN_ISSUER" "$CHECK" >> .env
sudo chmod +rw .env
#Ending env