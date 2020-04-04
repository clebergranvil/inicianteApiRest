exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table){
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('omgs_id').notNullable();

        table.foreign('omgs_id').references('id').inTable('omgs');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
