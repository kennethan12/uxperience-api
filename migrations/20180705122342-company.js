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

  db.createTable('company', {
    owner_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'owner_id_company_fk',
        table: 'user',
        rules: {
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        },
        mapping: 'user_id'
      }
    },
    employee_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'employee_id_company_fk',
        table: 'user',
        rules: {
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        },
        mapping: 'user_id'
      }
    },
    role_id: {
      type: 'int',
      notNull: true
    },
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('company', function (err) {
    if (err) return callback(err);

    return callback();
  });
};

exports._meta = {
  "version": 1
};

