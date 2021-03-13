const Sequelize = require('sequelize');
const fs=require('fs')
const path = require('path');
const env = process.env.NODE_ENV || 'local';
const config = require('../../config/config').get(env);

console.log("db data", config.DATABASE)


const sequelize = new Sequelize(config.DATABASE.dbConnectUrl?config.DATABASE.dbConnectUrl:config.DATABASE.dbname, config.DATABASE.username, config.DATABASE.pass, {
    host: config.DATABASE.host,
    dialect: 'postgres',
});



let models =[];
 sequelize.authenticate().then(async resolve => {
  fs.readdirSync(__dirname).filter((file) =>
      file !== 'index.js'
  ).forEach((file) => {

    models.push(require(path.join(__dirname, file)));
  })
     models.forEach((model) => model(sequelize,Sequelize.DataTypes));
     let entries = Object.entries(sequelize.models);
     let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
     sequelize.models = Object.fromEntries(capsEntries);

  //await sequelize.sync({ force: true });
  console.log('Connection has been established successfully.');

}).catch(error => {
  console.error('Unable to connect to the database:', error);
  process.exit(1);
});



module.exports = {...sequelize.models,sequelize:sequelize};

