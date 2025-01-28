FROM node:14

WORKDIR /toolbox
EXPOSE 8005
COPY . .
RUN npm install

CMD [ "npm", "run", "start" ]