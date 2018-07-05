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

  db.createTable('location', {
    location_id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    address: {
      type: 'string',
      notNull: true
    },
    city_name: {
      type: 'string',
      notNull: true
    },
    state_province_region: {
      type: 'string',
      notNull: true
    },
    zip_number: {
      type: 'int',
      notNull: true,
    },
    country: {
      type: 'string',
      notNull: true
    }
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('location', function (err) {
    if (err) return callback(err);

    return callback();
  });
};

exports._meta = {
  "version": 1
};
