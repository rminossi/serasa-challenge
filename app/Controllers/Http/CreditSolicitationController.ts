import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import FinancialInstitution from 'App/Models/FinancialInstitution'

export default class CreditSolicitationController {
  public async requestProposals({ request, view, auth }: HttpContextContract) {
    const user = auth.user
    const proposalRequestSchema = await request.validate({
      schema: schema.create({
        amount: schema.number(),
        number_of_installments: schema.number(),
      }),
      messages: {
        'amount.required': 'O valor total é obrigatório!',
        'number_of_installments.required': 'O número de parcelas é obrigatório!',
      },
    })
    const proposals = [] as any
    var score
    if (user) {
      if (user.score <= 300) {
        score = 1
      } else if (user.score > 300 && user.score <= 500) {
        score = 2
      } else if (user.score > 500 && user.score <= 700) {
        score = 3
      } else {
        score = 4
      }
    }
    const institutions = await FinancialInstitution.all()
    institutions.map((i) => {
      let proposal = [] as any
      switch (score) {
        case 1:
          proposal.rate = i.bad_score_rate
          break
        case 2:
          proposal.rate = i.regular_score_rate
          break
        case 3:
          proposal.rate = i.good_score_rate
          break
        case 4:
          proposal.rate = i.excellent_score_rate
          break
      }
      proposal.amount = proposalRequestSchema.amount
      proposal.finalAmount = Math.round(
        Math.pow(1 + proposal.rate, proposalRequestSchema.number_of_installments)
      )
      proposal.institution = i
      proposal.number_of_installments = proposalRequestSchema.number_of_installments
      proposal.installments = Math.round(
        proposal.finalAmount / proposalRequestSchema.number_of_installments
      )
      proposals.push({ ...proposal })
      console.log(proposals)
    })
    return view.render('request', { proposals })
  }
}
