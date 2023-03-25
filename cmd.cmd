


git checkout dev
git pull origin dev
git merge logout
git push origin dev


git checkout main
git pull origin main
git merge dev
git push origin main


http://localhost:8000/api/csrf/restore


    "unmigrate": "npx dotenv sequelize-cli db:migrate:undo:all",
    "migrate": "npx dotenv sequelize-cli db:migrate",
    "seed": "npx dotenv sequelize-cli db:seed:all",
    "unseed": "npx dotenv sequelize-cli db:seed:undo:all"





npx sequelize-cli model:generate --name SpotImage --attributes spotId:integer,url:string,preview:boolean
npx sequelize-cli model:generate --name Game --attributes gameType:string,gameId:integer,deckId:integer,active:boolean,playerCount:integer


******** NEW Build Script ********
npm install &&
npm run render-postbuild &&
npm run build &&
npm run sequelize --prefix backend db:migrate &&
npm run sequelize --prefix backend db:seed:all




# build command - enter all in one line
npm install &&
npm run build &&
npm run sequelize --prefix backend db:migrate &&
npm run sequelize --prefix backend db:seed:all




npm install &&
npm run build &&
npm run sequelize --prefix backend db:migrate &&
npm run sequelize --prefix backend db:seed:all


npm install &&
npm run build &&
npm run sequelize --prefix backend db:migrate:undo:all &&
npm run sequelize --prefix backend db:migrate &&
npm run sequelize --prefix backend db:migrate:undo:all 



npm install &&
npm run build &&
npm run sequelize --prefix backend db:migrate &&
npm run sequelize --prefix backend db:seed:undo:all &&
npm run sequelize --prefix backend db:migrate:undo:all 




npm start

JWT_SECRET - click "Generate"
JWT_EXPIRES_IN - copy value from local .env file
NODE_ENV - production
SCHEMA -
DATABASE_URL - copy value from Internal Database URL field




npx sequelize-cli seed:generate --name user-seeds