'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class place extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.place.belongsToMany(models.user, {through: "users_places"})
      models.place.hasMany(models.note)
    }
  }
  place.init({
    name: DataTypes.STRING,
    yelpUrl: DataTypes.TEXT,
    category: DataTypes.STRING,
    address: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'place',
  });
  return place;
};