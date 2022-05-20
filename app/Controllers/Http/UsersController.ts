import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  // Show all Users
  public async index ({ response}: HttpContextContract) {
    try {
      return User.all()
    } catch (error) {
      return response.json(error)
    }
  }

  // Create a new user and save in the db
  public async store ({ request, response }: HttpContextContract) {
    try {
      const body = request.body()
      const user = await User.create(body)
      response.status(201)
      return user
    } catch (error) {
      return response.json(error)
    }
  }

  // Show a specific user
  public async show ({ params, response }: HttpContextContract) {
    try{
      const user = await User.findOrFail(params.id)
      return user
    } catch (error){
      return response.json(error)
    }
  }

  // Update a user
  public async update ({ params, request, response }: HttpContextContract) {
    try{
      const body = request.body()
      const user = await User.findOrFail(params.id)
      user.name = body.name
      user.email = body.email
      user.department = body.department
      return user.save()
    }catch(error){
      return response.json(error)
    }
  }

  // Delete a user
  public async destroy ({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      user.delete()
      return 'User deleted successfully'
    } catch (error) {
      return response.json(error)
    }
  }
}
