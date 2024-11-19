const chai = require('chai')
const chaiHttp = require('chai-http')
const sinon = require('sinon')
const expect = chai.expect
const todoModel = require('../models/todoModel')
const app = require('../server')

chai.use(chaiHttp)

describe('Health Check', () => {
  it('should return status 200 and OK message', async () => {
    const res = await chai.request(app).get('/api/api/view')
    expect(res).to.have.status(200)
    expect(res.text).to.equal('OK')
  })
})

describe('Dinner Management API', () => {
  let sandbox
  let requester

  before(() => {
    requester = chai.request(app).keepOpen()
  })

  after(() => {
    requester.close()
  })

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('GET /api/view', () => {
    it('should return status 200', async () => {
      const res = await requester.get('/api/view')
      expect(res).to.have.status(200)
    })

    it('should return all todos', async () => {
      // Setup
      const mockTodos = [{"id":1,"date":"2024-11-13","cookTitle":"味噌汁、かぼちゃの煮付け","drinkTitle":"研修飲み会","cooking":true,"drinking":true},{"id":2,"date":"2024-11-14","cookTitle":"","drinkTitle":"11F飲み会","cooking":false,"drinking":true},{"id":3,"date":"2024-11-15","cookTitle":"","drinkTitle":"","cooking":false,"drinking":false},{"id":4,"date":"2024-11-18","cookTitle":"","drinkTitle":"","cooking":false,"drinking":false},{"id":5,"date":"2024-11-19","cookTitle":"","drinkTitle":"","cooking":false,"drinking":false},{"id":6,"date":"2024-11-20","cookTitle":"","drinkTitle":"","cooking":false,"drinking":false},{"id":7,"date":"2024-11-21","cookTitle":"","drinkTitle":"","cooking":false,"drinking":false},{"id":8,"date":"2024-11-22","cookTitle":"","drinkTitle":"","cooking":false,"drinking":false},{"id":9,"date":"2024-11-25","cookTitle":"","drinkTitle":"","cooking":false,"drinking":false},{"id":10,"date":"2024-11-26","cookTitle":"","drinkTitle":"","cooking":false,"drinking":false},{"id":11,"date":"2024-11-27","cookTitle":"","drinkTitle":"","cooking":false,"drinking":false},{"id":12,"date":"2024-11-28","cookTitle":"","drinkTitle":"","cooking":false,"drinking":false},{"id":13,"date":"2024-11-29","cookTitle":"","drinkTitle":"","cooking":false,"drinking":false}]

      sandbox.stub(todoModel, 'findAll').resolves(mockTodos)

      // Execute
      const res = await requester.get('/api/todos')

      // Assert
      expect(res.body).to.deep.equal(mockTodos)
    })

    it('should return status 500 when there is a server error', async () => {
      sandbox.stub(todoModel, 'findAll').rejects(new Error('Database Error'))

      const res = await requester.get('/api/view')

      expect(res).to.have.status(500)
      expect(res.body).to.have.property('error', 'Failed to get todos')
    })
  })
})
