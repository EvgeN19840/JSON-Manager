exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn('test_all_time', {
    status: { type: 'text', notNull: false },  
    comment: { type: 'text', notNull: false },
  });

  // Для таблицы tests
  pgm.addColumn('tests', {
    status: { type: 'varchar(20)', notNull: false },
    comment: { type: 'text', notNull: false },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('test_all_time', ['status', 'comment']);
  pgm.dropColumn('tests', ['status', 'comment']);
};