const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = mongoose.Schema({

  name:{
    required: true,
    type: String,
    unique: 1,
    maxlength: 100
  },
  description:{
    required: true,
    type: String,
    maxlength: 10000
  },
  price:{
    required: true,
    type: Number,
    maxlength: 255
  },
  brand:{
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    required: true
  },
  shipping:{
    required: true,
    type: Boolean
  },
  available:{
    required: true,
    type: Boolean
  },
  type:{
    type: Schema.Types.ObjectId,
    ref: 'Type',
    required: true
  },
  sold:{
    type: Number,
    maxlength: 1000,
    default: 0
  },
  publish:{
    required: true,
    type: Boolean
  },
  images:{
    type: Array,
    default: []
  }

},{timestamps:true});

const Model = mongoose.model('Model', modelSchema);

module.exports = { Model }
