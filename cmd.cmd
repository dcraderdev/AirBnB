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