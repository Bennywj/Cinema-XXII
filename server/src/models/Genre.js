module.exports = (sequelize, DataTypes) => 
  sequelize.define('Genre', {
    genre_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
})