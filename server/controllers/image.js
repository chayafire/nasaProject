const request = require('request');
const dotenv = require('dotenv');
const Image = require('../models/Image');
const User = require('../models/User');

dotenv.config();



const getAllimage = async (req, res) => {
    try {

    let currentImages = await Image.find({ "user": req.params.user })

        if (currentImages < 1) {
      res.status(200).json({ "messege": "There is no Image for this user" });
    }
    else {
      res.status(200).json({ currentImages });
    }
  }

  catch (error) {
    res.status(400).json({ errorMessege: error });
  }
}

const newImageUser = async (req, res) => {

  try {

    const cIMage = await new Image(req.body);
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


const getImagebyId = async (req, res) => {
  let image
  try {
    image = await Image.findById(req.params.id)
    res.send(image)
  }
  catch (error) {
    res.send(error)
  }
}


const getImageToday = async (req, res) => {
  try {
    const data = await requestApi()
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


const requestApi = (data) => {
  return new Promise((resolve, reject) => {
    console.log('requestApi');
    let options = {
      method: "GET",
      url: 'https://api.nasa.gov/planetary/apod?api_key=AxYmZ2SvB2PTSWPxZAiityAhRqk4cgPndlrKE6YU'

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


module.exports = { getAllimage, getImageToday, newImageUser, getImagebyId };
