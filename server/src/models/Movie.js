module.exports = (sequelize, DataTypes) => 
  sequelize.define('Movie', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    genre_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cast_star: {
      type: DataTypes.STRING,
      allowNull: false
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    release_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false
    },
    producer: {
      type: DataTypes.STRING,
      allowNull: false
    }
})