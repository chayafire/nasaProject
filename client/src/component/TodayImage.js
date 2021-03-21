import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image'
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  }
}

export default connect(mapStateToProps)(function TodayImage(props) {
  const { user } = props;
  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [explanation, setExplanation] = useState("")

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Beare ${localStorage.getItem("token")}`);
    myHeaders.append("Content-Type", "application/json");
    let raw = "";

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`http://localhost:3000/getImageToday/${user.id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        let result2 = JSON.parse(result)
        setUrl(result2.newImage.url)
        setTitle(result2.newImage.title)
        setExplanation(result2.newImage.explanation)
      })
      .catch(error => console.log('error', error));

  }, []);


  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>picture of the day</h2>

            <Image src={`${url}`} rounded className=" w-100" />
          </div>

          <div className="col mt-5">
            <h2>{title}</h2>
            <p>{explanation}</p>
          </div>

        </div>
      </div>
    </div>

  )
}) 