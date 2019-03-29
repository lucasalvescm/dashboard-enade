import React, { Component } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import { thArray } from 'variables/Variables.jsx';
import InstitutionsDialog from 'components/InstitutionsDialog/InstitutionsDialog.jsx';

class Institutions extends Component {
  constructor(props, context) {
    super(props, context);

    this.getListInstitutions = this.getListInstitutions.bind(this);

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
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error: true
          });
        }
      );
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
                category="Cadastre ou edite a performance de uma instituição"
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
                          {thArray.map((prop, key) => {
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
                              <td>-</td>
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
