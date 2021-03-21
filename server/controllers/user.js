const jwt = require('jsonwebtoken');
const request = require('request');
const dotenv = require('dotenv');
const Image = require('../models/Image');
const User = require('../models/User');
dotenv.config();


const login = async (req, res) => {
  try {

    let user = await User.findOne({
      email: req.params.email,
      password: req.params.password,
    });
    if (user < 1) {
      res.send("The user is not defined, Please register");
    }
    else {
      let token = jwt.sign({ email: req.params.email, password: req.params.password }, process.env.ACSSES_TOKEN_SECRET)
      res.send({ "messege": "You have successfully logged in", user, token });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}




const createUser = async (req, res) => {

  const { name, email, password } = req.body;

  let newUser = new User({
    name,
    email,
    password
  });



  try {
    await newUser.save();

    let token = jwt.sign({ password: req.body.password, email: req.body.email }, process.env.ACSSES_TOKEN_SECRET)

    console.log(token);
    res.status(200).json({ user: newUser, token })

  }
  catch (error) {
    res.status(400).send(error)
  }
}


const createImagebyDate = async (req, res) => {


  try {
    let date = req.body.date
    const data = await requestApi(date)
    let image = JSON.parse(data)
    const cIMage = new Image(image);
    let user = req.params.user;
    cIMage.user = user;
    await cIMage.save()
    let arrUser = await User.findByIdAndUpdate(req.params.user, { $push: { Images: cIMage._id } })
    await arrUser.save();

    res.status(200).json({ newImage: cIMage })
  }
  catch (error) {
    res.status(400).send(error)
  }
}
 

const requestApi = (date) => {
  return new Promise((resolve, reject) => {
    let options = {
      method: "GET",
      url: `https://api.nasa.gov/planetary/apod?api_key=AxYmZ2SvB2PTSWPxZAiityAhRqk4cgPndlrKE6YU&date=${date}`

    }

    request(options, (err, res, body) => {
      if (err)
        reject(err)
      else {
        resolve(body)
      }
    })

  })
}


module.exports = { createUser, login, createImagebyDate }






