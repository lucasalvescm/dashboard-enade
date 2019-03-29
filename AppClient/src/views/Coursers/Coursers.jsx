import React, { Component } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';

import Button from "components/CustomButton/CustomButton.jsx";

import Card from 'components/Card/Card.jsx';
import { thCoursers } from 'variables/Variables.jsx';
import CoursersDialog from 'components/CoursersDialog/CoursersDialog.jsx';
import swal from 'sweetalert';


class Coursers extends Component {
  constructor(props, context) {
    super(props, context);

    this.getListCoursers = this.getListCoursers.bind(this);
    this.deleteCoursers = this.deleteCoursers.bind(this);

    this.state = {
      items: [],
      isLoaded: false,
      error: false
    };
  }

  componentDidMount() {
    this.getListCoursers();
  }
  getListCoursers() {
    fetch('http://localhost:8080/coursers')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error: true
          });
        }
      );
  }
  deleteCoursers(id) {
    swal({
      title: "Confirma a exclusão?",
      text: "Tem certeza que deseja remover o curso?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          const that = this;
          fetch('http://localhost:8080/coursers/' + id + '/delete', {
            method: 'delete'
          })
            .then(function (response) {
              swal("Curso removido", {
                icon: "success",
              });
              that.getListCoursers()
            })

        }
      });

  }
  render() {
    const { items } = this.state;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Cadastro de Cursos"
                category="Cadastro e exclusão de cursos"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <form>
                    <Col md={12}>
                      <CoursersDialog refreshListInstitutions={this.getListCoursers} />
                    </Col>
                    <Table striped hover>
                      <thead>
                        <tr>
                          {thCoursers.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, key) => {
                          return (
                            <tr key={item._id}>
                              <td>{item.name}</td>
                              <td>
                                <Button bsStyle="danger" fill onClick={e => this.deleteCoursers(item._id)}>
                                  Excluir
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Coursers;
