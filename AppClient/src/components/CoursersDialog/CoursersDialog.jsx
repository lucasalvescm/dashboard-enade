import React, { Component } from 'react';
import { Modal, Table } from 'react-bootstrap';
import NotificationSystem from "react-notification-system";
import { style } from "variables/Variables.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import swal from 'sweetalert';

class CoursersDialog extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleName = this.handleName.bind(this);
    this.postCourse = this.postCourse.bind(this);
    this.validate = this.validate.bind(this);

    this.state = {
      show: false,
      items: [],
      name: "",
      isLoaded: false,
      error: false,
      _notificationSystem: null
    };
  }

  componentDidMount() {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    // var _notificationSystem = this.refs.notificationSystem;

  }

  handleClose() {
    this.setState({
      show: false,
      name: ""
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

  handleName(event) {
    this.setState({ name: event.target.value })
  }
  validate() {
    var msg = ''
    var error = false
    if (this.state.name === '') {
      msg += '\n- Preencha o nome do curso'
      error = true
    }

    return {
      msg: msg,
      error: error
    }
  }

  postCourse() {
    var message = "Curso inserido com sucesso"
    var level = "success"
    let validate = this.validate();
    if (validate.error) {
      swal("Oops", validate.msg, "error")
    }
    else {
      let newCourse = {
        name: this.state.name,
      }
      const that = this;
      fetch('http://localhost:8080/coursers/create', {
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        body: JSON.stringify(newCourse)
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
            name: ''
          });
          that.props.refreshListInstitutions();
        }
      });
    }

  }

  render() {
    return (
      <div>

        <Button bsStyle="success" fill onClick={this.handleShow}>
          Cadastrar Curso
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cadastro de Curso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="form-group col-md-12">
                <label>Nome:</label>
                <input type="text" value={this.state.name} onChange={this.handleName} className="form-control" />
              </div>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" fill onClick={this.handleClose}>
              Fechar
            </Button>
            <Button bsStyle="primary" fill onClick={this.postCourse}>
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>
        <NotificationSystem ref="notificationSystem" style={style} />
      </div >
    );
  }
}

export default CoursersDialog;
