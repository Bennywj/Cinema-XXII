module.exports = (sequelize, DataTypes) => 
  sequelize.define('Profile_Picture', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    file_name: {
      type: DataTypes.TEXT,
      allowNull: false
    }
})