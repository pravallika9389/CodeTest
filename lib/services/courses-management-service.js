// Can create this sort of model if we want to fetch data from DB
// var CourseMaster = require('../models/coursemaster-model').CourseMaster;
// Read Synchrously
var fs = require("fs");
console.log("\n *START* \n");
// Get content from file
 var contents = fs.readFileSync("./lib/data/output.json");
// Define to JSON type
 var jsonContent = JSON.parse(contents);
 // Get Value from JSON
 console.log("Student ID:", jsonContent[0].student_id);
// Search for distinct items
 var lookup = {};
 var lookup_array = [];
var items = jsonContent;
var result = [];

for (var item, i = 0; item = items[i++];) {

  var name = item.name;

  if (!(name in lookup)) {
    lookup[name] = 1;
    result.push(name);
  }
}
console.log("\n *EXIT* \n");

exports.getClassDetails = (callback) => {
  return new Promise(
    (resolve, reject) => {
      var classDetails = [];
       for(var item, i = 0; item = items[i++];){
         if(items[i].class_details.length !== 0){
           formSeperateArrayForUniqueCourses(items[i].class_details);
         }
         if(i === items.length-1){
           resolve(classDetails);
         }
       }
    });
};

exports.formSeperateArrayForUniqueCourses = (classDetailsArray) => {
  return new Promise(
    (resolve, reject) => {

      for(var i=0; i<classDetailsArray-1;i++){
        var course = {
          "subject_code": "","subject_desc":""
        };
        course.subject_code = classDetailsArray[i].subject_code;
        course.subject_desc = classDetailsArray[i].subject_desc;
        console.log(course);
        if(!(lookup_array.includes(course))){
          lookup_array.push(course);
          // console.log(course);
          // console.log(lookup_array);
        }
        if(i === items.length-1){
          resolve(lookup_array);
        }
      }
    });
};

exports.getAllUniqueCourses = (callback) => {
  return new Promise(
    (resolve, reject) => {
    //  var lookup_array = [];
      var lookup_array = [];
     var items = jsonContent;
     // console.log("Student ID:", jsonContent[0].student_id);
     var result = [];

     for (var item, i = 0; item = items[i++];) {
        //  console.log(items[i].class_details);
        if(items[i].class_details.length !== 0){
          console.log("if loop");
          for(var j=0;j<items[i].class_details.length;j++){
            console.log("for loop"+items[i].class_details[j].subject_code);
            var course = {
              "subject_code": "","subject_desc":""
            };
        //    course.subject_code = items[i].class_details[j].subject_code;
            course.subject_desc = items[i].class_details[j].subject_desc;
            console.log(course);
          //  if(!(JSON.stringify(obj1) === JSON.stringify(obj2))){
            if(!(lookup_array.includes(course))){
              lookup_array.push(course);
              // console.log(course);
              // console.log(lookup_array);
              var t = items.length-1;
              if(i === t){
                resolve(lookup_array);
              }
            }
          }

        }
       // var name = item.name;
       //
       // if (!(name in lookup)) {
       //   lookup[name] = 1;
       //   result.push(name);
       // }

     }

      // SectionMaster.find()
      //  .then(sections => { resolve(sections); })
      //  .catch(err => {
      //    console.error('error while reading sections from DB: %s: %s ', err, err.stack);
      //    reject(err);
      //  });
  //    getClassDetails(req, res).then(result =>{resolve(result);}).catch(err => {throw err;});
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
