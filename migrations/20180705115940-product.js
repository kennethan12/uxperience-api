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

  db.createTable('product', {
    product_id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    provider_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'provider_id_product_fk',
        table: 'user',
        rules: {
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        },
        mapping: 'user_id'
      }
    },
    name: {
      type: 'string',
      notNull: true
    },
    description: {
      type: 'string'
    },
    category_id: {
      type: 'int'
    },
    photo_url: {
      type: 'string'
    },
    city: {
      type: 'string'
    }
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('product', function (err) {
    if (err) return callback(err);

    return callback();
  });
};

exports._meta = {
  "version": 1
};
