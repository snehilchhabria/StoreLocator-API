const mongoose = require("mongoose");

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

module.exports = storeScehma;