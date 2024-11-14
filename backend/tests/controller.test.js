const chai = require('chai')
const chaiHttp = require('chai-http')
const sinon = require('sinon')
const expect = chai.expect
const todoModel = require('../models/todoModel')
const app = require('../server')

chai.use(chaiHttp)

describe('Health Check', () => {
  it('should return status 200 and OK message', async () => {
    const res = await chai.request(app).get('/api/health')
    expect(res).to.have.status(200)
    expect(res.text).to.equal('OK')
  })
})

describe('Todo API', () => {
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

  describe('GET /api/todos', () => {
    it('should return status 200', async () => {
      const res = await requester.get('/api/todos')
      expect(res).to.have.status(200)
    })

    it('should return all todos', async () => {
      // Setup
      const mockTodos = [
        { id: 1, title: 'Test Todo 1', completed: false },
        { id: 2, title: 'Test Todo 2', completed: true },
      ]

      sandbox.stub(todoModel, 'findAll').resolves(mockTodos)

      // Execute
      const res = await requester.get('/api/todos')

      // Assert
      expect(res.body).to.deep.equal(mockTodos)
    })

    it('should return status 500 when there is a server error', async () => {
      sandbox.stub(todoModel, 'findAll').rejects(new Error('Database Error'))

      const res = await requester.get('/api/todos')

      expect(res).to.have.status(500)
      expect(res.body).to.have.property('error', 'Failed to get todos')
    })
  })
})
