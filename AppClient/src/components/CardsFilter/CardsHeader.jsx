import React, { Component } from 'react';
import { api_urls } from "../../variables/Variables.jsx"
import { Col } from "react-bootstrap";
import { StatsCard } from "../../components/StatsCard/StatsCard.jsx";

class CardsHeaders extends Component {
  constructor(props, context) {
    super(props, context);

    this.getFilters = this.getFilters.bind(this);

    this.state = {
      instituitions: 0,
      higher_note_institutions: { name: "", note: 0 },
      higher_note_alumns: { course: "", note: 0, instituition: "" }
    };
  }

  componentDidMount() {
    this.getFilters();

  }


  getFilters() {
    fetch(api_urls.analytics + '/filters_headers')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            instituitions: result.total_inst,
            higher_note_institutions: result.higher_note,
            higher_note_alumns: result.higher_note_alumns

          })
        },
        error => {
          this.setState({
            isLoaded: true,
            error: true
          });
        }
      );
  }


  render() {
    const { instituitions, higher_note_alumns, higher_note_institutions } = this.state;
    return (
      <div>
        <Col lg={4} sm={6}>
          <StatsCard
            bigIcon={<i className="pe-7s-study text-warning" />}
            statsText="Total de Instituições Cadastradas"
            statsValue={instituitions}
            statsIcon={<i className="fa fa-refresh" />}
            statsIconText="Updated now"
          />
        </Col>
        <Col lg={4} sm={6}>
          <StatsCard
            bigIcon={<i className="pe-7s-graph1 text-danger" />}
            statsText="Maior Nota Geral de Instituição"
            statsValue={higher_note_institutions.note}
            statsIconText={higher_note_institutions.name}
          />
        </Col>
        <Col lg={4} sm={6}>
          <StatsCard
            bigIcon={<i className="pe-7s-smile text-success" />}
            statsText="Maior Média de Nota de Alunos"
            statsValue={higher_note_alumns.note}
            statsIconText={
              "Instituição: " + higher_note_alumns.instituition +
              " | Curso: " + higher_note_alumns.course

            }
          />
        </Col>
      </div>
    )
  }

}


export default CardsHeaders;

