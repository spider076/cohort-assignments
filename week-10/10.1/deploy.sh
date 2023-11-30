## this file is for aws machine for deploy bash

#!/bin/bash

# Set Node.js version using NVM
source /home/ubuntu/.nvm/nvm.sh
nvm use 18.17.0

cd frontend-deployEx
git pull origin master
cd server
pm2 kill
npm run start