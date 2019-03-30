import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Card } from "components/Card/Card.jsx";
import { api_urls } from "variables/Variables.jsx"

class CardInstitutions extends Component {
  constructor(props, context) {
    super(props, context);

    this.getListInstitutions = this.getListInstitutions.bind(this);
    this.changeName = this.changeName.bind(this);

    this.state = {
      institutions: [],
      institutionsSearched: []
    };
  }

  componentDidMount() {
    this.getListInstitutions();

  }


  getListInstitutions() {
    fetch(api_urls.analytics + '/filter_institutions')
      .then(res => res.json())
      .then(
        result => {
          let institutions = {}
          for (var idx in result) {
            institutions[result[idx].name] = result[idx].generalNote
          }
          this.setState({
            institutions: institutions
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

  changeName(event) {
    let name = event.target.value;
    if (name.length >= 2) {
      let institutionsSearched = this.state.institutionsSearched
      for (var institution in this.state.institutions) {
        if (institution.includes(name)) {
          let keyExists = false
          institutionsSearched.map((k, v) => {
            if (Object.keys(k).indexOf(institution) >= 0) {
              keyExists = true
            }
          })
          if (keyExists === false) {
            institutionsSearched.push({
              [institution]: this.state.institutions[institution]
            })
            this.setState({
              institutionsSearched: institutionsSearched
            })
          }
        }
      }
    }
    else {
      this.setState({ institutionsSearched: [] })
    }
  }

  render() {
    const { institutionsSearched } = this.state;
    return (
      <Card
        statsIcon=""
        id="chartHours"
        title="Instituições"
        category="Filtro de instituições pelo nome"
        stats=""
        content={
          <div>
            <div className="form-group">
              <input type="text" className="form-control" id="exampleInputEmail1"
                aria-describedby="textHelp" placeholder="Digite o nome da instituição para pesquisar"
                onChange={this.changeName} />
              <small id="textHelp" className="form-text text-muted">Pesquise a instituição pelo nome.</small>
            </div>
            <Table striped hover>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Nota Geral</th>
                </tr>
              </thead>
              <tbody>
                {institutionsSearched.map((value, key) => {
                  let k = Object.keys(value)[0]
                  console.log(institutionsSearched.length)
                  return (
                    <tr key={key}>
                      <td>{k}</td>
                      <td>{value[k]}</td>
                    </tr>
                  );
                })}
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

