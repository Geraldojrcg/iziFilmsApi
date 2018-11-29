'use strict';
module.exports = (sequelize, DataTypes) => {
  const Film = sequelize.define('Film', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    cape_url: DataTypes.STRING,
    date_release: DataTypes.STRING
  }, {});
  Film.associate = function(models) {
    // associations can be defined here
  };
  return Film;
};