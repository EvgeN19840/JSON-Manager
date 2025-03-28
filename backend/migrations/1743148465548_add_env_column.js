exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn('test_all_time', {
    env: { type: 'text', notNull: false },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('test_all_time', ['env']);
};