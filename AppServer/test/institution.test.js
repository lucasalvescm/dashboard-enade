process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Institution = require('../app/models/institution.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Institutions', () => {
    beforeEach(done => {
        Institution.deleteMany({}, err => {
            done();
        });
    });
    describe('/GET institutions', () => {
        it('it should GET all the institutions', done => {
            chai
                .request(server)
                .get('/institutions')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
    describe('/POST institution', () => {
        it('it should POST a one institution', done => {
            let institution = {
                "name": "Pitágoras",
                "generalNote": 10,
                "coursers": [{
                    "name": "Sistemas de Informação",
                    "note": 5,
                    "averageStudentNote": 4
                }]
            }
            chai
                .request(server)
                .post('/institutions/create')
                .send(institution)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property('name').eql(institution.name);
                    done();
                });
        });
    });
});