import React,{useEffect} from 'react';
import {
  Link
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Navbar'
import { connect } from 'react-redux';
import { setUserImages, setUserId, setUserName, setUserEmail, setUserPassword } from '../redux/action';
import firebase from '../firebase/firebase'
import { useHistory } from 'react-router-dom';

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

export default connect(mapStateToProps, mapDispatchToProps)(function NavbarComp(props) {
  const { user } = props;
  const { setName, setImages, setId, setEmail, setPassword } = props;
  const history = useHistory();



  useEffect(() => {
    

    history.push('/login')
        firebase.auth().signOut();
        localStorage.clear()
   
},[])




  
  function logOut() {
    firebase.auth().signOut();
    history.push('/login')
    localStorage.removeItem('token')
    setName("");
    setImages("")
    setId("")
    setEmail("")
    setPassword("")
  }

  return (

    <div >

      <Navbar bg="light" variant="light">
        <Navbar.Brand ></Navbar.Brand>
        <Nav className="mr-auto">
          {!user.name && (
            <>

              <Link className="py-3 px-md-3" to="/login">login</Link>
            </>
          )}
          {user.name && (
            <>
              <div>
                <Link className="py-3 px-md-3" to="/userSearches">UserSearches</Link>

                <Link className="py-3 px-md-3" to="/todayImage">TudayImage</Link>
                <Link className="py-3 px-md-3" to="/newSearch">NewSearch</Link>
                <Link className="py-3 px-md-3" onClick={logOut} to="/login" >LogOut</Link>
              </div>
            </>
          )}

        </Nav>


      </Navbar>

    </div>

  )
})