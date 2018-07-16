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

  db.createTable('menu', {
    menu_id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'product_id_menu_fk',
        table: 'product',
        rules: {
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        },
        mapping: 'product_id'
      }
    },
    date: {
      type: 'string',
      notNull: true
    },
    time: {
      type: 'string',
      notNull: true
    },
    price: {
      type: 'int',
      notNull: true
    },
    location_id: {
      type: 'int'
    },
    availability: {
      type: 'boolean',
      notNull: true
    }
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('menu', function (err) {
    if (err) return callback(err);

    return callback();
  });
};

exports._meta = {
  "version": 1
};
