/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
}).middleware('guest')

Route.get('/signup', async ({ view }) => {
  return view.render('auth/signup')
}).middleware('guest')

Route.post('/signup', 'AuthController.register')
Route.post('/login', 'AuthController.login')
Route.post('/logout', 'AuthController.logout')
Route.post('/requestProposals', 'CreditSolicitationController.requestProposals').middleware('auth')

Route.get('/login', async ({ view }) => {
  return view.render('auth/login')
}).middleware('guest')

Route.get('/index', async ({ view }) => {
  return view.render('index')
}).middleware('auth')

Route.get('/list', async ({ view }) => {
  return view.render('list')
}).middleware('auth')

Route.get('/request', async ({ view }) => {
  return view.render('request')
}).middleware('auth')

Route.get('/results', async ({ view }) => {
  return view.render('results')
}).middleware('auth')
