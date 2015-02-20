/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /Cms              ->  index
 * POST    /Cms              ->  create
 * GET     /Cms/:id          ->  show
 * PUT     /Cms/:id          ->  update
 * DELETE  /Cms/:id          ->  destroy
 */
 //this is to define new services in the cms
 //and who has access to them
 //and to serve a view of the cms panels

'use strict';

var _ = require('lodash');
var Cms = require('./cms.model');

// Get list of Cms
exports.index = function(req, res) {
  Cms.find(function (err, Cms) {
    if(err) { return handleError(res, err); }
    return res.json(200, Cms);
  });
};

// Get a single Cms
exports.show = function(req, res) {
  Cms.findById(req.params.id, function (err, Cms) {
    if(err) { return handleError(res, err); }
    if(!Cms) { return res.send(404); }
    return res.json(Cms);
  });
};

// Creates a new Cms in the DB.
exports.create = function(req, res) {
  Cms.create(req.body, function(err, Cms) {
    if(err) { return handleError(res, err); }
    return res.json(201, Cms);
  });
};

// Updates an existing Cms in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Cms.findById(req.params.id, function (err, Cms) {
    if (err) { return handleError(res, err); }
    if(!Cms) { return res.send(404); }
    var updated = _.merge(Cms, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, Cms);
    });
  });
};

// Deletes a Cms from the DB.
exports.destroy = function(req, res) {
  Cms.findById(req.params.id, function (err, Cms) {
    if(err) { return handleError(res, err); }
    if(!Cms) { return res.send(404); }
    Cms.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}