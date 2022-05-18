import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  // Show all Users
  public async index ({ }: HttpContextContract) {
    return User.all()
  }

  // Create a new user and save in the db
  public async store ({ request, response }: HttpContextContract) {
    const body = request.body()
    const user = await User.create(body)
    response.status(201)
    return user
  }

  // Show a specific user
  public async show ({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    return user
  }

  // Update a user
  public async update ({ params, request }: HttpContextContract) {
    const body = request.body()
    const user = await User.findOrFail(params.id)
    user.name = body.name
    user.email = body.email
    user.department = body.department
    return user.save()
  }

  // Delete a user
  public async destroy ({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    user.delete()
    return 'User deleted successfully'
  }
}
