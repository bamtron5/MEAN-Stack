'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CmsTemplatesSchema = new Schema({
  title: String,
  link: String,
  templateJson: {}
});

module.exports = mongoose.model('CmsTemplates', CmsTemplatesSchema);