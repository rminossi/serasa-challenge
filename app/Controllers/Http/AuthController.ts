import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async register({ request, response, auth }: HttpContextContract) {
    const newUserSchema = await request.validate({
      schema: schema.create({
        name: schema.string(),
        tax_id: schema.string({ trim: true }, [rules.unique({ table: 'users', column: 'tax_id' })]),
        email: schema.string({ trim: true }, [
          rules.email(),
          rules.unique({ table: 'users', column: 'email' }),
        ]),
        password: schema.string({ trim: true }, [rules.confirmed(), rules.minLength(8)]),
      }),
      messages: {
        'name.required': 'O nome é obrigatório!',
        'email.required': 'O email é obrigatório!',
        'tax_id.required': 'O CPF é obrigatório!',
        'tax_id.unique': 'CPF já cadastrado!',
        'password.required': 'A senha é obrigatória!',
        'password.minLength': 'A senha deve conter no mínimo 8 caracteres.',
        'email.unique': 'Email já cadastrado.',
      },
    })
    const user = new User()
    user.name = newUserSchema.name
    user.email = newUserSchema.email
    user.tax_id = newUserSchema.tax_id
    user.password = newUserSchema.password
    user.score = Math.floor(Math.random() * (1000 + 1))
    user.save()
    return response.redirect('/login')
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const userSchema = await request.validate({
      schema: schema.create({
        email: schema.string({ trim: true }, [rules.email()]),
        password: schema.string({ trim: true }, [rules.minLength(8)]),
      }),
      messages: {
        'email.required': 'O email é obrigatório!',
        'password.required': 'A senha é obrigatória!',
      },
    })
    await auth.use('web').attempt(userSchema.email, userSchema.password)
    return response.redirect('/index')
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.redirect('/')
  }
}
