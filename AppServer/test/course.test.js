process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Course = require('../app/models/course.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Coursers', () => {
    beforeEach(done => {
        Course.deleteMany({}, err => {
            done();
        });
    });
    describe('/GET coursers', () => {
        it('it should GET all the coursers', done => {
            chai
                .request(server)
                .get('/coursers')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
    describe('/POST course', () => {
        it('it should POST a one course', done => {
            let course = {
                name: 'Sistemas de Informação',
            };
            chai
                .request(server)
                .post('/coursers/create')
                .send(course)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property('name').eql(course.name);
                    done();
                });
        });
    });
    describe('/PUT courser', () => {
        it('it should PUT a exist courser', done => {
            let course_array = {
                name: 'Ciências da Computação',
            };
            let course = new Course(course_array);
            course.save(function(err, course) {
                chai
                    .request(server)
                    .put('/coursers/' + course._id + '/update')
                    .type('form')
                    .send({ name: 'Engenharia' })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('name').eql('Engenharia');
                        done();
                    });
            });
        });
    });
    describe('/DELETE course', () => {
        it('it should DELETE a exist course', done => {
            let course_array = {
                name: 'Arquitetura',
            };
            let course = new Course(course_array);
            course.save(function(err, course) {
                chai
                    .request(server)
                    .delete('/coursers/' + course._id + '/delete')
                    .send()
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });
    });
});