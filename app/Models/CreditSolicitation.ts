import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import FinancialInstitution from './FinancialInstitution'

export default class CreditSolicitation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public finantialInstitutionId: number

  @column()
  public amount: number

  @column()
  public rate: number

  @column()
  public status: string

  @column()
  public installments: number

  @column()
  public numberOfInstallments: number

  @column()
  public day: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => FinancialInstitution)
  public finantial_institution: BelongsTo<typeof FinancialInstitution>
}
