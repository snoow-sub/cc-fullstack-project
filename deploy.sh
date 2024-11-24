#!/usr/bin/bash

cd /home/ubuntu/DiscoverU/backend
npm i
npm install -g forever
forever restart index.js

cd /home/ubuntu/DiscoverU/frontend
npm i
npm install -g forever
forever restart -c "npm run start" .
