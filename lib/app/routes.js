var bodyparser = require('body-parser');
var jsonParser = bodyparser.json();
var courses = require('../controllers/courses-controller');

module.exports = function(app) {
  "use strict";

  app.use(jsonParser);

  app.get('/uniqueCourses', courses.getAllUniqueCourses);
  app.post('/studentIdsByCourses', jsonParser, courses.getStudentIdsByCourses);

};
