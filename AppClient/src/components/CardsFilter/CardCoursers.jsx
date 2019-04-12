import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Card } from "../../components/Card/Card.jsx";
import { api_urls } from "../../variables/Variables.jsx"

class CardCoursers extends Component {
  constructor(props, context) {
    super(props, context);

    this.getListCoursers = this.getListCoursers.bind(this);
    this.filterCourse = this.filterCourse.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      coursers: [],
      cousersByInstituitions: [],
      courseSelected: "",
      orderBySelected: "note"
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

  filterCourse(courseName, orderBy) {
    if (courseName !== "") {
      fetch(
        api_urls.analytics +
        '/filter_coursers_in_institutions/'
        + courseName + '/'
        + orderBy)
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
  }

  handleSelect(event) {
    let index = event.nativeEvent.target.selectedIndex;
    let courseName = event.nativeEvent.target[index].text
    this.setState({
      courseSelected: courseName
    })
    this.filterCourse(courseName, this.state.orderBySelected);
  }

  handleRadio(event) {
    this.setState({
      orderBySelected: event.target.value
    })
    this.filterCourse(this.state.courseSelected, event.target.value);
  }


  render() {
    const { coursers, cousersByInstituitions, orderBySelected } = this.state;
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
              <select className="form-control" id="exampleFormControlSelect1" onChange={this.handleSelect}>
                <option></option>;
                      {coursers.map((course, key) => {
                  return <option key={key}>{course.name}</option>;
                })}
              </select>
              <small id="textHelp" className="form-text text-muted">Selecione um curso e veja as unidades que oferecem esse curso e a nota geral</small>

            </div>
            <label>Ordenar por:</label>
            <div className="radio">
              <label>
                <input type="radio" value="note" checked={orderBySelected === 'note'} onChange={this.handleRadio} />
                Nota Geral do Curso
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="averageStudentNote" checked={orderBySelected === 'averageStudentNote'} onChange={this.handleRadio} />
                Média de Notas dos Alunos
              </label>
            </div>

            <Table striped hover>
              <thead>
                <tr>
                  <th>Instituição</th>
                  <th>Nota Geral do Curso</th>
                  <th>Média de Notas dos Alunos</th>
                </tr>
              </thead>
              <tbody>
                {cousersByInstituitions.map((value, key) => {
                  return (
                    <tr key={key}>
                      <td>{value.name}</td>
                      <td>{value.coursers[0].note}</td>
                      <td>{value.coursers[0].averageStudentNote}</td>
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

