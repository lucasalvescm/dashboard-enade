import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Card } from "components/Card/Card.jsx";
import { api_urls } from "variables/Variables.jsx"

class CardCoursers extends Component {
  constructor(props, context) {
    super(props, context);

    this.getListCoursers = this.getListCoursers.bind(this);
    this.filterCourse = this.filterCourse.bind(this);

    this.state = {
      coursers: [],
      cousersByInstituitions: []
    };
  }

  componentDidMount() {
    this.getListCoursers();

  }


  getListCoursers() {
    fetch(api_urls.coursers)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            coursers: result
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

  filterCourse(event) {
    let index = event.nativeEvent.target.selectedIndex;
    let courseName = event.nativeEvent.target[index].text
    console.log(courseName)
    fetch(api_urls.analytics + '/filter_coursers_in_institutions' + '/' + courseName)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            cousersByInstituitions: result
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


  render() {
    const { coursers, cousersByInstituitions } = this.state;
    return (
      <Card
        statsIcon=""
        id="chartHours"
        title="Cursos"
        category="Filtro de cursos"
        stats=""
        content={
          <div>
            <div className="form-group">
              <select className="form-control" id="exampleFormControlSelect1" onChange={this.filterCourse}>
                <option></option>;
                      {coursers.map((course, key) => {
                  return <option key={key}>{course.name}</option>;
                })}
              </select>
              <small id="textHelp" className="form-text text-muted">Selecione um curso e veja as unidades que oferecem esse curso e a nota geral</small>
            </div>
            <Table striped hover>
              <thead>
                <tr>
                  <th>Instituição</th>
                  <th>Nota Geral do Curso</th>
                </tr>
              </thead>
              <tbody>
                {cousersByInstituitions.map((value, key) => {

                  return (
                    <tr key={key}>
                      <td>{value.name}</td>
                      <td>{value.coursers[0].note}</td>
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


export default CardCoursers;

