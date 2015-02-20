/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/cms.templates             ->  index
 * POST    /api/cms.templates              ->  create
 * GET     /api/cms.templates/:id          ->  show
 * PUT     /api/cms.templates/:id          ->  update
 * DELETE  /api/cms.templates/:id          ->  destroy
 */
 //this is to define new services in the CmsTemplates
 //and who has access to them
 //and to serve a view of the CmsTemplates panels

'use strict';

var _ = require('lodash');
var CmsTemplates = require('./cms.templates.model');

// Get list of CmsTemplates
exports.index = function(req, res) {
  CmsTemplates.find(function (err, CmsTemplates) {
    if(err) { return handleError(res, err); }
    return res.json(200, CmsTemplates);
  });
};

// Get a single CmsTemplates
exports.show = function(req, res) {
  console.log(req.params);
  CmsTemplates.findById(req.params.id, function (err, CmsTemplates) {
    if(err) { return handleError(res, err); }
    if(!CmsTemplates) { return res.send(404); }
    return res.json(CmsTemplates);
  });
};

// Creates a new CmsTemplates in the DB.
exports.create = function(req, res) {
  CmsTemplates.create(req.body, function(err, CmsTemplates) {
    if(err) { return handleError(res, err); }
    return res.json(201, CmsTemplates);
  });
};

// Updates an existing CmsTemplates in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  CmsTemplates.findById(req.params.id, function (err, CmsTemplates) {
    if (err) { return handleError(res, err); }
    if(!CmsTemplates) { return res.send(404); }
    var updated = _.merge(CmsTemplates, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, CmsTemplates);
    });
  });
};

// Deletes a CmsTemplates from the DB.
exports.destroy = function(req, res) {
  CmsTemplates.findById(req.params.id, function (err, CmsTemplates) {
    if(err) { return handleError(res, err); }
    if(!CmsTemplates) { return res.send(404); }
    CmsTemplates.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}