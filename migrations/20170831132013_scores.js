
exports.up = function(knex, Promise) {
  return knex.schema.createTable('scores', function(table) {
    table.increments();
    table.timestamp('game_date').defaultTo(new Date().toISOString());
    table.float('alan_score');
    table.float('mike_score');
    table.boolean('winner_side');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('scores');
};
