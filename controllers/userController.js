//logic to resolve register request

const users = require("../model/userSchema");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  console.log("inside register controller");
  const { username, email, password } = req.body;
  console.log(username, email, password);

  try {
    const existingUser = await users.findOne({ mailId: email });

    if (existingUser) {
      res.status(406).json("Account already exists");
    } else {
      //create an object for the model

      const newUser = new users({
        username,
        mailId: email,
        password,
        github: "",
        linkedIn: "",
        profile: "",
      });

      //to save the data in mongoDB
      await newUser.save();
      //response
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.login = async (req, res) => {
  console.log("Inside the Login Controller");
  const { email, password } = req.body;
  console.log(email, password);
  console.log(users);
  try {
    const exisitingUser = await users.findOne({
      mailId: email,
      password,
    });
    if (exisitingUser) {
      const token = jwt.sign({ userId: exisitingUser._id }, "superscretjey");
      res.status(200).json({
        exisitingUser,
        token,
      });
    } else {
      res.status(401).json("Invalid Email Id or password");
    }
  } catch (error) {
    console.log(res.status(401).json(`Request failed due to ${error}`));
  }
};
exports.updateProfileController = async (req, res) => {
  const userId = req.payload;
  const { username, email, password, github, linkedin, profile } = req.body;

  ProfileImage = req.file ? req.file.filename : profile;

  try {
    const existingUser = await users.findByIdAndUpdate(
      { _id: userId },
      {
        username,
        mailId: email,
        password,
        github,
        linkedIn: linkedin,
        profile: ProfileImage,
      },
      { new: true }
    );
    await existingUser.save();
    res.status(200).json(existingUser);
  } catch (error) {
    console.log(res.status(401).json(`Request failed due to ${error}`));
  }
};
