'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {



    static associate(models) {

      Spot.hasMany(models.Booking,{ foreignKey: 'spotId' })
      Spot.hasMany(models.Review,{foreignKey:'spotId'})
      Spot.belongsTo(models.User,{as:'Owner', foreignKey:'ownerId'})
      Spot.hasMany(models.SpotImage,{foreignKey:'spotId'})
    }
  }
  
  Spot.init({
    
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false

    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Spot',
    // scope:{
      // allSpots(userId){
        // return {
        //   {
        //     where: { userId: userId }, //req.user.id
        //     include:[
        //       { model: User, attributes: ['id', 'firstName', 'lastName'] },
        
        //       { model: Spot,
        //         attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price',
        //         [
        //           Sequelize.literal(
        //             `(SELECT url FROM ${
        //               schema ? `"${schema}"."SpotImages"` : 'SpotImages'
        //             } WHERE "SpotImages"."spotId" = "Spot"."id" AND "SpotImages"."preview" = true LIMIT 1)`
        //           ),
        //           'previewImage',
        //         ]],
        //       },
        //       { model: ReviewImage, attributes: ['id', 'url'] }
        //     ],
        //     attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt']
        //   }
        // }
      // }
    // }
  });
  return Spot;
};

//Spot.scope({method: ["allSpot"]}).findAll()