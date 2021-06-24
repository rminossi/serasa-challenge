import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FinancialInstitutions extends BaseSchema {
  protected tableName = 'financial_institutions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.float('bad_score_rate')
      table.float('regular_score_rate')
      table.float('good_score_rate')
      table.float('excellent_score_rate')
      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
