const mongoose = require("mongoose");
const geocoder = require('../utils/geocoder');

const storeScehma = mongoose.Schema({
    storeId:{
        type: String,
        required: [true, 'Please add a store ID'],
        unique: true,
        trim: true,
        maxLength: [10, 'Store ID must be less than 10 characters']
    },
    address: {
      type: String,
      required: [true, 'Please add an address']
    },
    location: {
        type: {
          type: String, 
          enum: ['Point'], //point is a geojson point
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress : String
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
});

//geocode & create location
storeScehma.pre('save', async function(next){
  const loc = await geocoder.geocode(this.address);
  console.log(loc);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  }

  //Do not save address in the database
  this.address = undefined;
  next();
});

module.exports = mongoose.model('Store', storeScehma); 