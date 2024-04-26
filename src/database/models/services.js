
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Services extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Services.belongsTo(models.Category,{foreignKey:'CategoryId'})
      Services.hasMany(models.Booking,{foreignKey:'serviceId'})
    }
  }
  Services.init({
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    location: DataTypes.STRING,
    ticketAvailability: DataTypes.INTEGER, 
    CategoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Services',
  });
  return Services;
};