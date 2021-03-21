
import firebase from '../firebase/firebase'
import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from 'react-router-dom';
import './Login.css';
import { UserProvider } from './UserContext'
import { connect } from 'react-redux';
import { setUserImages, setUserId, setUserName, setUserEmail, setUserPassword } from '../redux/action';

function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    setId: (val) => dispatch(setUserId(val)),
    setName: (val) => dispatch(setUserName(val)),
    setEmail: (val) => dispatch(setUserEmail(val)),
    setPassword: (val) => dispatch(setUserPassword(val)),
    setImages: (val) => dispatch(setUserImages(val)),

  }
)


export default connect(mapStateToProps, mapDispatchToProps)(function Register(props) {

  const { user } = props;
  const { setImages, setId, setName } = props;
  const [nameForm, setNameForm] = useState("");
  const [emailForm, setEmailForm] = useState("");
  const [passwordForm, setPasswordForm] = useState("");
  const history = useHistory();

  function add(user) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "name": nameForm, "email": emailForm, "password": passwordForm });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3000/newUser", requestOptions)
      .then(response => response.text())
      .then(result => {

        let result2 = JSON.parse(result)
        // alert(`Hii hello ${result2.user.name}`)
        localStorage.setItem('token', result2.token)
        setId(result2.user._id)
        setImages(result2.user.Images)
        setName(result2.user.name)
        history.push('/todayImage')
      })
      .catch(error => console.log('error', error));
  }


  function handleSubmit(event) {
    event.preventDefault();

    firebase.auth().createUserWithEmailAndPassword(emailForm, passwordForm)
      .then((data) => {

        console.log(data)
        add(user)
      }
      ).catch(err => alert(err))
  }

  function validateForm() {
    return emailForm.length > 0 && passwordForm.length > 0;
  }


  return (

    <div className="b">
      <div className="Login">
        <div className="d-flex justify-content-center m-2">
          <h2 >Register</h2>
        </div>

        <UserProvider value={user}>

        </UserProvider>
        <Form onSubmit={handleSubmit}>

          <Form.Group size="lg" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={nameForm}
              onChange={(e) => setNameForm(e.target.value)}
            />
          </Form.Group>

          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={emailForm}
              onChange={(e) => setEmailForm(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={passwordForm}
              onChange={(e) => setPasswordForm(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Sign up
        </Button>

        </Form>
      </div>
    </div>
  )
})