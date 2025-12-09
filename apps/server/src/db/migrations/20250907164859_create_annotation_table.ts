import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('annotation', (table) => {
    // Primary key for the table
    table.increments('id').primary();

    // Foreign keys to link annotations to books and devices
    // This ensures data integrity. If a book is deleted, its annotations are also deleted.
    table
      .string('book_md5', 32) // MD5 hashes are 32 hex characters
      .notNullable()
      .references('md5')
      .inTable('book')
      .onDelete('CASCADE')
      .index(); // Add an index for faster lookups by book

    table
      .string('device_id')
      .notNullable()
      .references('id')
      .inTable('device')
      .onDelete('CASCADE')
      .index(); // Add an index for faster lookups by device

    // Columns from the KoReaderAnnotation type
    table.text('chapter').notNullable();
    table.string('color').notNullable();
    table.string('datetime').notNullable();
    table.string('datetime_updated'); // This one can be nullable
    table.string('drawer').notNullable();
    table.string('page').notNullable();
    table.integer('pageno').notNullable();
    table.text('pos0').notNullable();
    table.text('pos1').notNullable();
    table.text('text').notNullable();
    table.text('note'); // Notes can be nullable (for highlights without notes)

    table.unique(['book_md5', 'pos0', 'pos1', 'text']);
  });
}

export async function down(knex: Knex): Promise<void> {
  throw new Error('Down migration impossible');
}
