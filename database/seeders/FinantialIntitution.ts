import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import FinancialInstitution from 'App/Models/FinancialInstitution'

export default class FinantialIntitutionSeeder extends BaseSeeder {
  public async run() {
    await FinancialInstitution.createMany([
      {
        name: 'Santander',
        bad_score_rate: 12.7,
        regular_score_rate: 11.1,
        good_score_rate: 10.2,
        excellent_score_rate: 8.5,
      },
      {
        name: 'Bradesco',
        bad_score_rate: 12.5,
        regular_score_rate: 11,
        good_score_rate: 10,
        excellent_score_rate: 8,
      },
      {
        name: 'Primacredi',
        bad_score_rate: 12,
        regular_score_rate: 10.9,
        good_score_rate: 10.2,
        excellent_score_rate: 8.3,
      },
      {
        name: 'Unicred',
        bad_score_rate: 13.5,
        regular_score_rate: 11.5,
        good_score_rate: 10.3,
        excellent_score_rate: 8.8,
      },
      {
        name: 'BV Financeira',
        bad_score_rate: 12.9,
        regular_score_rate: 11.3,
        good_score_rate: 10.4,
        excellent_score_rate: 8.7,
      },
    ])
  }
}
