import React from 'react';
import { useState } from 'react';
import Image from 'react-bootstrap/Image'
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps)(function TodayImage(props) {
    const { user } = props;
    const [date, setDate] = useState("")
    const [url, setUrl] = useState("")
    const [title, setTitle] = useState("")
    const [explanation, setExplanation] = useState("")

    function handleSubmit(event) {
        event.preventDefault();
        getImage()

    }

    function getImage() {
        var myHeaders = new Headers();
        myHeaders.append('Authorization', `Beare ${localStorage.getItem("token")}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "date": `${date}` });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        // headers:{Authorization:`Beare ${localStorage.getItem("token")}`},
        fetch(`http://localhost:3000/createImagebyDate/${user.id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setUrl(result.newImage.url)
                console.log(result.newImage.url)
                setTitle(result.newImage.title)
                setExplanation(result.newImage.explanation)

            })
            .catch(error => console.log('error', error))
    }


    return (
        <div>
            <form className="form-inline d-flex justify-content-center mt-4" onSubmit={handleSubmit}>
                <input className="form-control mr-md-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setDate(e.target.value)} />
                <button className="btn btn-outline-primary ml-mr-md-4" type="submit" >Search by date</button>
            </form>
            <div className="container">
                <div className="row">
                    <div className="col mt-5">
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