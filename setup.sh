#!/usr/bin/bash

cd /home/ubuntu/DiscoverU/backend
npm i
npm run migrate
npm run seed

cd /home/ubuntu/DiscoverU/frontend
npm i
