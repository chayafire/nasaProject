import React, { useEffect, useState } from 'react';
import firebase from '../firebase/firebase'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from 'react-router-dom';
import './Login.css';
import { UserProvider } from './UserContext'

import { connect } from 'react-redux';
import { setUserImages, setUserId, setUserName, setUserEmail, setUserPassword } from '../redux/action';


const mapStateToProps = (state) => ({
  user: state.userReducer.user,
})


const mapDispatchToProps = (dispatch) => (
  {
    setId: (val) => dispatch(setUserId(val)),
    setEmail: (val) => dispatch(setUserEmail(val)),
    setPassword: (val) => dispatch(setUserPassword(val)),
    setName: (val) => dispatch(setUserName(val)),
    setImages: (val) => dispatch(setUserImages(val)),

  }
)



export default connect(mapStateToProps, mapDispatchToProps)(function Login(props) {
  const { user } = props;
  const { setName, setImages, setId } = props;

  const [emailForm, setEmailForm] = useState("");
  const [passwordForm, setPasswordForm] = useState("");

  const history = useHistory();

  useEffect((emailForm, passwordForm) => {


    if (emailForm === "" && passwordForm === "") {

      firebase.auth().signOut();
      localStorage.clear()
    }
  }, [])

  function check() {


    var requestOptions = {
      method: 'GET',

      redirect: 'follow'
    };

    fetch(`http://localhost:3000/login/${emailForm}/${passwordForm}`, requestOptions)
      .then(response => response.text())
      .then(result => {


        if (result === "The user is not defined, Please register") {
          alert('The user is not defined, Please register')
        }
        else {
          let result2 = JSON.parse(result)

          localStorage.setItem('token', result2.token)
          // alert(`Hii hello ${result2.user.name}`)

          setId(result2.user._id)
          setImages(result2.user.Images)
          setName(result2.user.name)
          history.push('/todayImage')

        }
      })

      .catch(error => {
        console.log('error', error)

      },

      );
  }


  function newUser() {
    history.push('/register')
  }


  function handleSubmit(event) {

    event.preventDefault();


    firebase.auth().signInWithEmailAndPassword(emailForm, passwordForm).then(
      (data) => {
        console.log(data)

        check()
      }

    ).catch(
      (err) => {
        alert(err)

      })
  }

  function validateForm() {
    return emailForm.length > 0 && passwordForm.length > 0;
  }


  return (

    <div className="background">

      <div >
        <div className="Login">

          <UserProvider value={user}>

          </UserProvider>
          <div className="d-flex justify-content-center m-2">
            <h2 >Login</h2>
          </div>
          <Form onSubmit={handleSubmit}>
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
                onChange={(e) => setPasswordForm((e.target.value))}

              />
            </Form.Group>
            <Button block size="lg" type="submit" disabled={!validateForm()}>
              Login
        </Button>

            <Link variant="link" to="/register" onClick={newUser}>Register</Link>
          </Form>


        </div>
      </div>
    </div>
  )
})