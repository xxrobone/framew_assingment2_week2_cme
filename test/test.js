const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');

const expect = chai.expect;

chai.use(chaiHttp);

const testServer = require('../server').serverForTest;

// first done the test den creating a fake server in index.js
describe('API', () => {
  describe('GET /', () => {
    let fakeServer;

    beforeEach(() => {
      fakeServer = testServer();
    });

    it('should return the object', (done) => {
      chai
        .request(fakeServer)
        .get('/')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);

          expect(res.body).to.be.a('object');

          expect(res.body).to.have.property('dancer');

          expect(res.body).to.have.property('person');
          expect(res.body.person).to.have.property('id');
          expect(res.body.person.id).to.be.a('number');
          expect(res.body.person).to.have.property('name');
          expect(res.body.person.name).to.be.string;
          expect(res.body.person.name).to.deep.equal('Robert Waegar');

          done();
        });
    });
  });
});

//
// figuring out what i need for the test to pass

/* 
const testServer = () => {
    const app = express()
    const apiPort = 6000
    const result = {
        dancer: 'tdd testing db',
        person: {
            id: 1, 
            name: 'Robert Waegar',
        }
    }

    app.get('/', (req, res) => {
        res.send(result)
    })

    app.listen(apiPort)

    return app
}
 */

// then creating the index file with the fake server
