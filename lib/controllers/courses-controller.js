var utils = require('../models/utilities');
var CoursesManagementService = require('../services/courses-management-service');
// var Validator = require('../security/validator');

// Function to retrieve all courses from DB
exports.getAllUniqueCourses = (req, res) => {
  "use strict";

  CoursesManagementService.getAllUniqueCourses()
  .then(courses => { return res.status('200').send(courses); })
  .catch(err => { return res.status('500').send('Error encountered while reading courses from DB'); })
};

// Function to retrieve all Student Ids from DB
exports.getStudentIdsByCourses = (req, res) => {
  "use strict";

  CoursesManagementService.getStudentIdsByCourses()
  .then(studentsIds => { return res.status('200').send(studentsIds); })
  .catch(err => { return res.status('500').send('Error encountered while reading students from DB'); })
};
