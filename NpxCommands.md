// npx sequelize-cli init


npx sequelize-cli model:generate --name Spot --attributes id:integer


npx sequelize-cli model:generate --name Review --attributes userId:integer,spotId:integer,review:string,stars:integer

npx sequelize-cli model:generate --name ReviewImage --attributes reviewId:integer,url:string


npx sequelize-cli migration:generate --name review-image-updated-created-changes 


// - Generate a new seed file
// npx sequelize-cli seed:generate --name <descriptiveName>
// npx sequelize-cli seed:generate --name base-spots
// npx sequelize-cli seed:generate --name base-bookings

// npx sequelize-cli seed:generate --name base-reviews
// npx sequelize-cli seed:generate --name base-spotImages
// npx sequelize-cli seed:generate --name base-reviewImages

npx sequelize-cli migration:generate --name review-image-changes












// - Run pending migrations
// npx dotenv sequelize-cli db:migrate

// - seed all the tables in your database
// npx dotenv sequelize-cli db:seed:all

imageableType
imageableId


npx sequelize-cli db:create
```

- Create Database
- will create your persistent database

<br></br>

```
npx sequelize-cli model:generate --name <ModelName> --attributes <column1>:
<type>,<column2>:<type>, etc...
```

- Generate a model and its migration
- --name should be PascalCase and singular
- --attributes should be camelCase and singular
- datatype will follow the : after the column name, and any options/restraints
- each column will be seperated by comas , , ,

<br></br>

```
npx sequelize-cli db:migrate
npx dotenv sequelize-cli db:migrate
```

- Run pending migrations

<br></br>

```
npx sequelize-cli db:migrate:undo
```

- Rollback/undo the last migration

<br></br>

```
npx sequelize-cli db:migrate:undo:all
```

- Rollback/undo all migrations

<br></br>

```
npx sequelize-cli seed:generate --name <descriptiveName>
```

- Generate a new seed file

<br></br>

```
npx sequelize-cli db:seed:all
npx dotenv sequelize-cli db:seed:all
```

- Rollback/undo last seed

<br></br>

```
npx sequelize-cli db:seed:undo:all
```

- Rollback/undo all seeds




npx sequelize model:generate --name Movies --attributes title:string
npx sequelize model:generate --name Genres --attributes genre:string


npx sequelize model:generate --name MovieGenres --attributes movieId:integer,genreId:integer
up: async (queryInterface, Sequelize) => {
  await queryInterface.createTable('MovieGenres', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    movieId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Movies' }
    },
    genreId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Genres' }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  });
},