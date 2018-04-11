module.exports = (sequelize, DataTypes) => 
  sequelize.define('Schedule', {
    movie_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    plaza_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    theater_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    start_hour: {
      type: DataTypes.TIME,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
})