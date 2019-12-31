const Sequelize = require('sequelize')

// Create the function for the 
// magic index file to make
// the things work
module.exports = function(sequelize, DataTypes){
  // make a class to get attached to the db
  class Burger extends Sequelize.Model { }

  // define the schema
  Burger.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false
    },
    isDevoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, { sequelize, modelName: 'Burger' });

  // make every thing work with db
  // do this in the index for the server
    //   Burger.sync();

  // return it so it is on the db 
  // and we can use it!
  return Burger;
}