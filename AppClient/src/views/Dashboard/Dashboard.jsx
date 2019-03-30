import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import CardInstitutions from "components/CardsFilter/CardInstitutions"
import CardCoursers from "components/CardsFilter/CardCoursers"
import CardsHeader from "components/CardsFilter/CardsHeader"


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
            <CardsHeader />
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
