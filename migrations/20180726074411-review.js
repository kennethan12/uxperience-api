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
  db.createTable('review', {
    review_id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    reviewer_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'reviewer_id_review_fk',
        table: 'user',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'user_id'
      }
    },
    product_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'product_id_review_fk',
        table: 'product',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'product_id'
      }
    },
    rating: {
      type: 'decimal',
      notNull: true
    },
    description: {
      type: 'string',
      length: 4069,
      notNull: true
    }
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('review', function (err) {
    if (err) return callback(err);

    return callback();
  });
};

exports._meta = {
  "version": 1
};
