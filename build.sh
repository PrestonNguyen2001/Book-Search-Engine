#!/bin/bash

# Install dependencies for both client and server
npm install
cd client
npm install
npm run build
cd ..

# Copy the client build to the server public directory
cp -r client/dist server/public

# Install server dependencies
cd server
npm install
cd ..
