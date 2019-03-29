import React, { Component } from 'react';
import { Modal, Table } from 'react-bootstrap';
import NotificationSystem from "react-notification-system";
import { style } from "variables/Variables.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

class InstitutionsDialog extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCourse = this.handleCourse.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleGeneralNote = this.handleGeneralNote.bind(this);
    this.addCourse = this.addCourse.bind(this);
    this.editNoteCourse = this.editNoteCourse.bind(this);
    this.editAverageCourse = this.editAverageCourse.bind(this);
    this.postInstitution = this.postInstitution.bind(this);
    this.getListCoursers = this.getListCoursers.bind(this);

    this.state = {
      courseSelected: '',
      coursers: [],
      nameInstitution: '',
      generalNote: "0",
      show: false,
      items: [],
      isLoaded: false,
      error: false,
      _notificationSystem: null
    };
  }

  componentDidMount() {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    this.getListCoursers();
    // var _notificationSystem = this.refs.notificationSystem;

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

  handleClose() {
    this.setState({
      show: false,
      courseSelected: '',
      coursers: [],
      nameInstitution: '',
      generalNote: "0",
    });
  }

  handleShow() {
    this.setState({
      show: true,
      courseSelected: '',
      coursers: [],
      nameInstitution: '',
      generalNote: "0",
    });
  }

  handleCourse(event) {
    var index = event.nativeEvent.target.selectedIndex;
    this.setState({ courseSelected: event.nativeEvent.target[index].text })
  }

  handleName(event) {
    this.setState({ nameInstitution: event.target.value })
  }

  handleGeneralNote(event) {
    this.setState({ generalNote: event.target.value })
  }

  addCourse() {
    let courseSelected = this.state.courseSelected;
    let coursers = this.state.coursers;

    let courseExists = false;
    coursers.map((course, index) => {
      if (course.name === courseSelected) {
        courseExists = true;
      } return ''
    });
    if (!courseExists && courseSelected !== '') {
      coursers.push({
        name: courseSelected,
        note: "0",
        averageStudentNote: "0"
      })
      this.setState({ coursers: coursers })
    }
    else {
      this.state._notificationSystem.addNotification({
        title: <span data-notify="icon" className="pe-7s-look" />,
        message: (
          <div>Selecione um curso ou verifique se ele já não está na listagem</div>
        ),
        level: "warning",
        position: "tr",
        autoDismiss: 15
      });

    }
  }

  editNoteCourse(value, courseName) {
    let coursers = this.state.coursers;
    let updateCoursers = []
    coursers.map((course, index) => {
      if (course.name === courseName) {
        let updateCourse = {
          name: course.name,
          note: value,
          averageStudentNote: course.averageStudentNote
        }
        updateCoursers.push(updateCourse)
      }
      else {
        updateCoursers.push(course)

      }
      return true
    });
    this.setState({ coursers: updateCoursers })
  }
  editAverageCourse(value, courseName) {
    let coursers = this.state.coursers;
    let updateCoursers = []
    coursers.map((course, index) => {
      if (course.name === courseName) {
        let updateCourse = {
          name: course.name,
          note: course.note,
          averageStudentNote: value
        }
        updateCoursers.push(updateCourse)
      }
      else {
        updateCoursers.push(course)

      }
      return true
    });

    this.setState({ coursers: updateCoursers })
  }


  postInstitution() {
    var message = "Performance inserida com sucesso"
    var level = "success"

    let newPerformance = {
      name: this.state.nameInstitution,
      generalNote: this.state.generalNote,
      coursers: this.state.coursers
    }
    const that = this;
    fetch('http://localhost:8080/institutions/create', {
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      body: JSON.stringify(newPerformance)
    }).then(function (response) {
      if (response.status !== 201) {
        message = "Ocorreu algum erro"
        level = "error"
        that.state._notificationSystem.addNotification({
          title: <span data-notify="icon" className="pe-7s-close" />,
          message: (
            <div>{message}</div>
          ),
          level: level,
          position: "tr",
          autoDismiss: 15
        });
      }
      else {
        that.state._notificationSystem.addNotification({
          title: <span data-notify="icon" className="pe-7s-check" />,
          message: (
            <div>{message}</div>
          ),
          level: level,
          position: "tr",
          autoDismiss: 15
        });
        that.setState({
          show: false,
          courseSelected: '',
          coursers: [],
          nameInstitution: '',
          generalNote: "0",
        });
        that.props.refreshListInstitutions();
      }


    });

  }

  render() {
    const { items, coursers } = this.state;
    return (
      <div>

        <Button bsStyle="success" fill onClick={this.handleShow}>
          Cadastrar Instituição
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cadastro de Performance</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="form-group col-md-12">
                <label>Nome Instituição:</label>
                <input type="text" value={this.state.name} onChange={this.handleName} className="form-control" />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-4">
                <label>Nota Geral:</label>
                <input type="text" value={this.state.generalNote} onChange={this.handleGeneralNote} className="form-control" />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-12">
                <label>Cursos:</label>
                <form className="form-inline">
                  <div className="form-group mb-8">
                    <select className="form-control" id="exampleFormControlSelect1" onChange={this.handleCourse}>
                      <option></option>;
                      {items.map((item, key) => {
                        return <option key={key}>{item.name}</option>;
                      })}
                    </select>
                  </div>
                  <button className="btn btn-primary" onClick={this.addCourse} style={{ marginLeft: 5 }}>Adicionar Curso</button>
                </form>
              </div>
            </div>
            <Table striped hover>
              <thead>
                <tr>
                  <th>Curso</th>
                  <th>Nota Geral</th>
                  <th>Média de Notas dos Alunos</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {coursers.map((course, key) => {
                  return (
                    <tr key={key}>
                      <td>{course.name}</td>
                      <td><input type="text" value={course.note} onChange={e => this.editNoteCourse(e.target.value, course.name)} className="form-control" /></td>
                      <td><input type="text" value={course.averageStudentNote} onChange={e => this.editAverageCourse(e.target.value, course.name)} className="form-control" /></td>
                      <td>-</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" fill onClick={this.handleClose}>
              Fechar
            </Button>
            <Button bsStyle="primary" fill onClick={this.postInstitution}>
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>
        <NotificationSystem ref="notificationSystem" style={style} />
      </div >
    );
  }
}

export default InstitutionsDialog;
