import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Card } from "components/Card/Card.jsx";

class CardInstitutions extends Component {

  render() {
    return (
      <Card
        statsIcon="fa fa-history"
        id="chartHours"
        title="Instituições"
        category="Filtro de instituições pelo nome"
        stats="Updated 3 minutes ago"
        content={
          <div>
            <Table striped hover>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Nota Geral</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </Table>
          </div>
        }
        legend={
          <div className="legend"></div>
        }
      />
    )
  }

}


export default CardInstitutions;

