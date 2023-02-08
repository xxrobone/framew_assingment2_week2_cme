import chai from 'chai';
import chaiHttp from 'chai-http';
/* import express from 'express'; */

// using chai for testing https://www.chaijs.com/
// done a tutorial first https://mochajs.org/

const expect = chai.expect;
const assert = chai.assert;

chai.use(chaiHttp);

import { server, result } from '../server.js';

// first done the test den creating a fake server in index.js
describe('API', () => {
  describe('GET /', () => {
    let fakeServer;

    beforeEach(() => {
      fakeServer = server();
      /*  console.log(fakeServer); */
    });

    it('should return the object', (done) => {
      chai
        .request(fakeServer)
        .get('/')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });
});

describe('result', () => {
  it('should return an object', (done) => {
    assert.typeOf(result.person, 'object');
    done();
  });
});
describe('result', () => {
  it('should return a string', (done) => {
    assert.typeOf(result.dancer, 'string');
    // failing attempt
    /* assert.typeOf(result.dancer, 'number'); */
    done();
  });
});

describe('result', () => {
  it('should return a property', (done) => {
    expect(result.person).to.have.property('name');
    //failing attempt property age
    /*  expect(result.person).to.have.property('age'); */
    done();
  });
});

describe('result', () => {
  it('the object property name should return Robert Waegar', (done) => {
    expect(result.person.name).to.deep.equal('Robert Waegar');
    // failing attemp
    /* expect(result.person.name).to.deep.equal('Pupert Johnsson'); */
    done();
  });
});

//
// figuring out what i need for the test to pass
/* expect(res.body).to.have.property('dancer');
expect(res.body).to.have.property('person');
expect(res.body.person).to.have.property('id');
expect(res.body.person.id).to.be.a('number');
expect(res.body.person).to.have.property('name');
expect(res.body.person.name).to.be.string;
expect(res.body.person.name).to.deep.equal('Robert Waegar'); */

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
