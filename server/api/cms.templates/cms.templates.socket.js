/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var cmsTemplates = require('./cms.templates.model');

exports.register = function(socket) {
  cmsTemplates.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  cmsTemplates.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('cmsTemplates:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('cmsTemplates:remove', doc);
}