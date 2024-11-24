#!/usr/bin/bash

cd /home/ubuntu/DiscoverU/backend
forever stop index.js
npm i
forever start index.js

cd /home/ubuntu/DiscoverU/frontend
forever stop -c "npm run start" .
npm i
forever start -c "npm run start" .
