'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {

  db.createTable('user', {
    user_id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: 'string',
      notNull: true,
      unique: true
    },
    firstname: {
      type: 'string',
      length: 255,
      notNull: true
    },
    lastname: {
      type: 'string',
      length: 255,
      notNull: true
    },
    password: {
      type: 'string',
      notNull: true
    },
    phone: {
      type: 'string'
    },
    photo_url: {
      type: 'string'
    }
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('user', function (err) {
    if (err) return callback(err);

    return callback();
  });
};

exports._meta = {
  "version": 1
};
