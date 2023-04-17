'use strict';
const {
  Model
} = require('sequelize');

const Sequelize = require('sequelize');
let schema
 if (process.env.NODE_ENV === 'production') {
  schema = process.env.SCHEMA;  
}
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.Spot,{foreignKey:'spotId'})
      Review.belongsTo(models.User,{ foreignKey:'userId'})
      Review.hasMany(models.ReviewImage,{foreignKey:'reviewId'})
    }
  }
  Review.init({
    userId: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER,
    review: DataTypes.TEXT,
    stars: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
    scopes:{
      allSpots(userId){
        const {
          User,
          Spot,
          Booking,
          SpotImage,
          Review,
          ReviewImage,
        } = require('../models');
        return {
          
            where: { userId: userId }, 
            include:[
              { model: User, attributes: ['id', 'firstName', 'lastName'] },
        
              { model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price',
                [
                  Sequelize.literal(
                    `(SELECT url FROM ${
                      schema ? `"${schema}"."SpotImages"` : 'SpotImages'
                    } WHERE "SpotImages"."spotId" = "Spot"."id" AND "SpotImages"."preview" = true LIMIT 1)`
                  ),
                  'previewImage',
                ]],
              },
              { model: ReviewImage, attributes: ['id', 'url'] }
            ],
            attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt']
          
        }
      }
    }
  });
  return Review;
};