import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreditSolicitations extends BaseSchema {
  protected tableName = 'credit_solicitations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table
        .integer('financial_institution_id')
        .unsigned()
        .references('financial_institutions.id')
        .onDelete('CASCADE')
      table.float('amount')
      table.float('rate')
      table.enum('status', ['active', 'settled', 'late'])
      table.float('installments')
      table.integer('number_of_installments')
      table.integer('day')
      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
