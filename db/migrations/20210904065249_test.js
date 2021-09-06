
exports.up = function (knex) {
    return knex.schema.createTable('closet', function (table) {
        table.increments();
        table.string('type').notNullable();
        table.string('color').notNullable();
        table.integer('season').notNullable();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('closet');
};
