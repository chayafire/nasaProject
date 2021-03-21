import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/Card'
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal'
function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  }
}

export default connect(mapStateToProps)(function TodayImage(props) {
  const { user } = props;
  const [history, setHistory] = useState([]);


  const [flag, setFlag] = useState(false);
  const [urlInput, setUrleInput] = useState("")
  const [titleInput, setTitleInput] = useState("")
  const [dateInput, setdateInput] = useState("")
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Beare ${localStorage.getItem("token")}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "title": `${titleInput}`, "date": `${dateInput}`, "url": `${urlInput}` });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`http://localhost:3000/newImageUser/${user.id}`, requestOptions)
      .then(response => response.text())

      .catch(error => console.log('error', error));
  };
  const handleShow = () => setShow(true);

  const getHistory = () => {
    setFlag(true)

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Beare ${localStorage.getItem("token")}`);

    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`http://localhost:3000/getAllimage/${user.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {

        let resultTest = result.currentImages

        setHistory(resultTest)

        setFlag(false)

      })
      .catch(error => console.log('error', error));

  }

  function myFunc(event) {

    var fileReader = new FileReader()
    fileReader.onload = ((e) => {
      setUrleInput(e.target.result);
    })
    setUrleInput(fileReader.readAsDataURL(event.target.files[0]))

  }



  return (
    <div >
      <div className="d-flex justify-content-center">
        <h2>the history</h2>
      </div>
      <div className="d-flex justify-content-center">

        <Button variant="outline-primary mr-md-2" onClick={getHistory}>Get history</Button>
        <br></br>


        <Button variant="primary mr-md-2" onClick={handleShow}>
          Add image
      </Button>
      </div>
      <div className=" align-self-center d-flex justify-content-center mt-5" >
        {flag ? <> <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div></> : <></>}
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <br></br>
          <input type="file" accept="url" onChange={myFunc} />
          <br></br>
          <div className="input-group mb-3">
            Enter url:
      <input type="text" className="form-control mb-3" onChange={(e) => setUrleInput(e.target.value)}></input>
          </div>
          <div className="input-group mb-3">
            Enter title:
      <input type="text" className="form-control mb-3" onChange={(e) => setTitleInput(e.target.value)}></input>
          </div>
          <div className="input-group mb-3">
            Enter date:
      <input type="text" className="form-control mb-3" onChange={(e) => setdateInput(e.target.value)}></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* /////history */}

      <div className="row">

        {
          history && history.map((item, index) =>
            <CardDeck key={index}>
              <Card className="p-3" variant="top" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={`${item.url}`} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                </Card.Body>
              </Card>
            </CardDeck>
          )}
      </div>
    </div>
  )
})


