//1) import express
const express = require("express");
const projectController = require("./controllers/projectController");
const multerConfig = require("./middleware/multerMiddleware");

//import userController
const userController = require("./controllers/userController");
const jwtMiddleware = require("./middleware/jwtMiddleware");

//2) to create router we are using a class router in express library
const router = new express.Router();

//router to resolve register request
router.post("/user/register", userController.register); // using router.post() to receive and handle POST requests that we get from frontend.

//router to resolve login request
router.post("/user/login", userController.login);

//router to add a project
router.post(
  "/projects",
  jwtMiddleware,
  multerConfig.single("projectImage"),
  projectController.addProject
);

// router to get all projects
router.get("/all-project", projectController.getAllProjectController);

//path to get project for home page
router.get("/home-project", projectController.getProjectController);

//path to get user project
router.get(
  "/user/all-project",
  jwtMiddleware,
  projectController.getUserProject
);
//path to delete a project
router.delete(
  "/delete-project/:id",
  jwtMiddleware,
  projectController.deleteProjectController
);

//path to edit project
router.put(
  "/update-project/:id",
  jwtMiddleware,
  multerConfig.single("projectImage"),
  projectController.editProjectController
);
//path to update profile
router.put(
  "/update-profile",
  jwtMiddleware,
  multerConfig.single("profile"),
  userController.updateProfileController
);

//EXPORT ROUTER
module.exports = router;
