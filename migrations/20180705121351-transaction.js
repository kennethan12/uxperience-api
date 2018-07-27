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

  db.createTable('transaction', {
    transaction_id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    stripe_charge_id: {
      type: 'string',
      notNull: true
    },
    price: {
      type: 'int',
      notNull: true
    },
    customer_token: {
      type: 'string',
      length: 4069,
      notNull: true
    },
    customer_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'customer_id_transaction_fk',
        table: 'user',
        rules: {
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        },
        mapping: 'user_id'
      }
    },
    provider_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'provider_id_transaction_fk',
        table: 'user',
        rules: {
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        },
        mapping: 'user_id'
      }
    },
    menu_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'menu_id_transaction_fk',
        table: 'menu',
        rules: {
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        },
        mapping: 'menu_id'
      }
    },
    date_sold: {
      type: 'string',
      notNull: true
    }
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('transaction', function (err) {
    if (err) return callback(err);

    return callback();
  });
};

exports._meta = {
  "version": 1
};
