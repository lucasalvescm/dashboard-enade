import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import { StatsCard } from "components/StatsCard/StatsCard.jsx";

import CardInstitutions from "components/CardsFilter/CardInstitutions"
import CardCoursers from "components/CardsFilter/CardCoursers"


class Dashboard extends Component {
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-study text-warning" />}
                statsText="Total de Instituições"
                statsValue="105B"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-notebook text-success" />}
                statsText="Total de Cursos"
                statsValue=""
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Last day"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                statsText="Média de Nota Geral das Instituições"
                statsValue="23"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-twitter text-info" />}
                statsText="Followers"
                statsValue="+45"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <CardInstitutions />
            </Col>
            <Col md={6}>
              <CardCoursers />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
