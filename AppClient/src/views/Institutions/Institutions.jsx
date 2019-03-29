import React, { Component } from 'react';
import { Grid, Row, Col, Table, ButtonGroup } from 'react-bootstrap';

import Button from "components/CustomButton/CustomButton.jsx";

import Card from 'components/Card/Card.jsx';
import { thInstitutions } from 'variables/Variables.jsx';
import InstitutionsDialog from 'components/InstitutionsDialog/InstitutionsDialog.jsx';
import swal from 'sweetalert';


class Institutions extends Component {
  constructor(props, context) {
    super(props, context);

    this.getListInstitutions = this.getListInstitutions.bind(this);
    this.deleteInstitution = this.deleteInstitution.bind(this);
    this.viewInstitution = this.viewInstitution.bind(this);

    this.state = {
      items: [],
      isLoaded: false,
      error: false
    };
  }

  componentDidMount() {
    this.getListInstitutions();
  }
  getListInstitutions() {
    fetch('http://localhost:8080/institutions')
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
  deleteInstitution(id) {
    swal({
      title: "Confirma a exclusão?",
      text: "Tem certeza que deseja remover a instituição?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          const that = this;
          fetch('http://localhost:8080/institutions/' + id + '/delete', {
            method: 'delete'
          })
            .then(function (response) {
              swal("Instituição removida", {
                icon: "success",
              });
              that.getListInstitutions()
            })

        }
      });

  }

  viewInstitution(json) {
    let body = "Nota Geral: " + json.generalNote;
    body += "\nCursos: "
    for (var idx in json.coursers) {
      body += "\n - " + json.coursers[idx].name +
        ":\n* Nota Geral: " + json.coursers[idx].note +
        "\n* Média dos Alunos: " + json.coursers[idx].averageStudentNote + '\n'
    }
    swal(json.name, body);
  }
  render() {
    const { items } = this.state;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Cadastro de Performance de Instituições"
                category="Cadastro e exclusão de performance de instituição"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <form>
                    <Col md={12}>
                      <InstitutionsDialog refreshListInstitutions={this.getListInstitutions} />
                    </Col>
                    <Table striped hover>
                      <thead>
                        <tr>
                          {thInstitutions.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, key) => {
                          return (
                            <tr key={item._id}>
                              <td>{item.name}</td>
                              <td>{item.generalNote}</td>
                              <td>
                                {item.coursers.map((course, key) => {
                                  return course.name + ', ';
                                })}
                              </td>
                              <td>
                                <ButtonGroup>
                                  <Button bsStyle="danger" fill onClick={e => this.deleteInstitution(item._id)}>
                                    Excluir
                                </Button>
                                  <Button bsStyle="primary" fill onClick={e => this.viewInstitution(item)}>
                                    Detalhes
                                </Button>
                                </ButtonGroup>
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

export default Institutions;
