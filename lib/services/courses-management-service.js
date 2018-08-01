// Can create this sort of model if we want to fetch data from DB
// var CourseMaster = require('../models/coursemaster-model').CourseMaster;
// Read Synchrously
var fs = require("fs");
console.log("\n *START* \n");
// Get content from file
 var contents = fs.readFileSync("./data/output.json");
// Define to JSON type
 var jsonContent = JSON.parse(contents);

exports.getAllUniqueCourses = (callback) => {
  return new Promise(
    (resolve, reject) => {
      SectionMaster.find()
       .then(sections => { resolve(sections); })
       .catch(err => {
         console.error('error while reading sections from DB: %s: %s ', err, err.stack);
         reject(err);
       });
  });
}


exports.addSection = (section) => {
  return new Promise(
    (resolve, reject) => {
      var sectionToSave = new SectionMaster({
        uuid: utilities.getUuid(),
        timestamp: utilities.getTimestamp(),
        sectionname: section.sectionname,
        status: 'active',
        catid: section.catid
      });
      sectionToSave.save()
      .then(savedSection => { resolve(savedSection); })
      .catch(err => { reject(err); })
  });
}
