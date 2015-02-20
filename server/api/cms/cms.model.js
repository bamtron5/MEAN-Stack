'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CmsSchema = new Schema({
  title: String,
  link: String,
  access: String
});

module.exports = mongoose.model('Cms', CmsSchema);