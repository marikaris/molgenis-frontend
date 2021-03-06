import td from 'testdouble'
import api from '@molgenis/molgenis-api-client'
import * as repository from '@/repository/dataRowRepository'

describe('appendToForm', () => {
  const formData = new FormData()

  beforeEach(function () {
    td.reset()
    const append = td.function('FormData.append')
    td.replace(formData, 'append', append)
  })

  it('should append string field', () => {
    repository.appendToForm([{id: 'x', type: 'string'}], formData, ['x', 'x'])
    td.verify(formData.append('x', 'x'))
  })

  it('should append file field with string value', () => {
    repository.appendToForm([{id: 'x', type: 'file'}], formData, ['x', 'x'])
    td.verify(formData.append('x', 'x'))
  })

  it('should append file field with Blob value', () => {
    const blob = new Blob([''], {type: 'text/html'})
    blob['lastModifiedDate'] = ''
    blob['name'] = 'my file'
    repository.appendToForm([{id: 'x', type: 'file'}], formData, ['x', blob])
    td.verify(formData.append('x', blob, 'my file'))
  })

  it('should append file field with null value', () => {
    repository.appendToForm([{id: 'x', type: 'file'}], formData, ['x', null])
    td.verify(formData.append('x', ''))
  })

  it('should append file field with undefined value', () => {
    repository.appendToForm([{id: 'x', type: 'file'}], formData, ['x', null])
    td.verify(formData.append('x', ''))
  })
})

describe('Data row repository', () => {
  const createResponse = {
    meta: {
      label: 'for create label'
    }
  }

  const updateResponse = {
    _meta: {
      label: 'for update label'
    },
    rowData: {
      e: 'f'
    },
    other: 'stuff'
  }

  beforeEach(function () {
    td.reset()

    const get = td.function('api.get')
    td.when(get('/api/v2/tableId?num=0')).thenResolve(createResponse)
    td.when(get('/api/v2/tableId/rowId')).thenResolve(updateResponse)
    td.replace(api, 'get', get)
  })

  describe('fetch', () => {
    it('when no rowId is set fetch the table structure and map it to form data', (done) => {
      repository.fetch('tableId', null).then(() => done(), () => {
        expect(true).to.equal(false) // fail test in case rejection
        done()
      })
    })

    it('when rowId is set fetch the table structure and data and map it to form data', (done) => {
      repository.fetch('tableId', 'rowId').then((resp) => {
        expect(resp.meta.label).to.equal('for update label')
        done()
      }, () => {
        expect(true).to.equal(false) // fail test in case rejection
        done()
      })
    })
  })

  describe('save', () => {
    const formData = {
      e: 'f'
    }

    const formFields = [
      {
        id: 'e',
        type: 'string'
      }
    ]

    let baseOptions = {
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      method: 'POST',
      credentials: 'same-origin'
    }

    beforeEach(function () {
      td.reset()
    })

    it('when no rowId is set should create a new row', (done) => {
      const post = td.function('api.post')
      baseOptions.body = JSON.stringify(formData)
      td.when(post('/api/v1/tableId?_method=PUT', baseOptions, false)).thenResolve({msg: 'create success'})
      td.replace(api, 'post', post)

      repository.save(formData, formFields, 'tableId', null).then((response) => {
        expect(response.msg).to.equal('create success')
        done()
      }, () => {
        expect(true).to.equal(false) // fail test in case rejection
        done()
      })
    })

    it('when rowId is set should update the existing row', (done) => {
      const post = td.function('api.post')
      baseOptions.body = JSON.stringify(formData)
      td.when(post('/api/v1/tableId/rowId?_method=PUT', baseOptions, false)).thenResolve({msg: 'update success'})
      td.replace(api, 'post', post)

      repository.save(formData, formFields, 'tableId', 'rowId').then((response) => {
        expect(response.msg).to.equal('update success')
        done()
      }, () => {
        expect(true).to.equal(false) // fail test in case rejection
        done()
      })
    })

    describe('when the formData includes a file field with file data', () => {
      const blob = new Blob([''], {type: 'text/html'})
      blob['lastModifiedDate'] = ''
      blob['name'] = 'my file'

      const formData = {
        e: blob,
        f: 'foobar',
        g: null,
        h: undefined
      }

      const formFields = [
        {
          id: 'e',
          type: 'file'
        },
        {
          id: 'f',
          type: 'string'
        },
        {
          id: 'g',
          type: 'string'
        },
        {
          id: 'h',
          type: 'string'
        }
      ]
      it('it should use a formData body and set the force headers flag to true', (done) => {
        const post = td.function('api.post')
        // match on anything as 'new FormData()' can not easily be stubbed
        td.when(post('/api/v1/tableId/rowId?_method=PUT', td.matchers.anything(), true)).thenResolve({msg: 'update with file success'})
        td.replace(api, 'post', post)
        repository.save(formData, formFields, 'tableId', 'rowId').then((response) => {
          expect(response.msg).to.equal('update with file success')
          done()
        }, () => {
          expect(true).to.equal(false) // fail test in case rejection
          done()
        })
      })
    })
  })
})
