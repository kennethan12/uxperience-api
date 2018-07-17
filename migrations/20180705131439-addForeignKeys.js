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
  db.addForeignKey('product', 'category', 'category_id_product_fk',
    {
      'category_id': 'category_id'
    },
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    }, () => db.addForeignKey('menu', 'location', 'location_id_menu_fk',
      {
        'location_id': 'location_id'
      },
      {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      }, () => db.addForeignKey('company', 'role', 'role_id_company_fk',
        {
          'role_id': 'role_id'
        },
        {
          onDelete: 'RESTRICT',
          onUpdate: 'RESTRICT'
        }, callback)));
};

exports.down = function (db, callback) {
  db.removeForeignKey('product', 'category_id_product_fk', function (err) {
    if (err) return callback(err);

    db.removeForeignKey('menu', 'location_id_menu_fk', function (err) {
      if (err) return callback(err);

      db.removeForeignKey('company', 'role_id_company_fk', callback);
    });
  });
};

exports._meta = {
  "version": 1
};
