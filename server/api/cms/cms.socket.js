/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var cms = require('./cms.model');

exports.register = function(socket) {
  cms.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  cms.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('cms:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('cms:remove', doc);
}