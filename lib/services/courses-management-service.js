// Can create this sort of model if we want to fetch data from DB
// var CourseMaster = require('../models/coursemaster-model').CourseMaster;
// Read Synchrously
var fs = require("fs");
const path = require('path');
const json = require('big-json');

const contents = fs.createReadStream('./lib/data/output.json');
const jsonContent = json.createParseStream();

console.log("\n *START* \n");
// Get content from file
// var contents = fs.readFileSync("./lib/data/output.json");
// Define to JSON type
// var jsonContent = JSON.parse(contents);
 // Get Value from JSON
 console.log("Student ID: %j", jsonContent);
// Search for distinct items
 var lookup = {};
 var lookup_array = [];
 var finalArray = [];
var items = jsonContent;
var result = [];

console.log("\n *EXIT* \n");
exports.getAllUniqueCourses = (callback) => {
  return new Promise(
    (resolve, reject) => {
      jsonContent.on('data', function(pojo) {
          // => receive reconstructed POJO
          console.log("Student ID: %j", pojo[0].student_id);
          //  var lookup_array = [];
            var lookup_array = [];
           var items = pojo;
            console.log("Student ID1:"+ pojo[0].student_id);
           var result = [];
           var classDetails_Array = [];
           var m = items.toString("binary").length;
           console.log("m :: "+m);
           for (var item, i = 0; item = items[i++];) {
              //  console.log(items[i].class_details);
              if(items[i].class_details.length !== 0){
                // console.log("if loop");
                for(var j=0;j<items[i].class_details.length;j++){
                  // console.log("for loop: "+items[i].class_details[j].subject_code);
                  var course = {
                    "subject_code": "","subject_desc":""
                  };
                  course.subject_code = items[i].class_details[j].subject_code;
                  course.subject_desc = items[i].class_details[j].subject_desc;
                  var fAL = finalArray.length;
                  if(fAL == 0){
                    finalArray.push(course);
                  }else{

                    // Try Queue Method
                    // creating object for queue class
            //        var queue = new Queue();


                    // Testing dequeue and pop on an empty queue
                    // returns Underflow
            //        console.log(queue.dequeue());

                    // returns true
            //        console.log(queue.isEmpty());

                    // Adding elements to the queue
                    // queue contains [10, 20, 30, 40, 50]
                  // End of trying Queue methods
                    // for(var k=0;k<fAL;k++){
                     for(var k=0;k<fAL;k++){
                       if(fAL != 0){
                         console.log('subject_code :: '+course.subject_code);
                         console.log('subject_code : '+finalArray[k].subject_code);
                         // if(finalArray[k].subject_code === course.subject_code){
                         if(finalArray[k].subject_code == course.subject_code){
                            console.log('true');
                         }else{
                         //  queue.enqueue(course);
                         console.log('inserting');
                           finalArray.push(course);
             // Try Queue Method
                           // returns 10
                       //    console.log(queue.front());

                           // removes 10 from the queue
                           // queue contains [20, 30, 40, 50, 60]
                       //    console.log(queue.dequeue());

                           // returns 20
                       //    console.log(queue.front());

                           // removes 20
                           // queue contains [30, 40, 50, 60]
                     //      console.log(queue.dequeue());

                           // printing the elements of the queue
                           // prints [30, 40, 50, 60]
                       //    console.log(queue.printQueue());
               // End of trying Queue Methods
                         }
                         if(i === m){
                           // console.log('finalArray :: %j',finalArray);
                           resolve(finalArray);
                         }

                       }else {
                         console.log('length =0;');
                         finalArray.push(course);
                       }


                    }


                    // for(var k=0;k<fAL;k++){
                    //
                    //     // if(finalArray[k].subject_code === course.subject_code){
                    //     if(finalArray[k].subject_code.includes(""+course.subject_code)){
                    //       // console.log()
                    //     }else{
                    //       console.log('finalArray %j',finalArray);
                    //       finalArray.push(course);
                    //     }
                    //     if(k === fAL){
                    //       // console.log('finalArray :: %j',finalArray);
                    //       resolve(finalArray);
                    //     }
                    //
                    // }
                  }
              // Try Using Sub functions - checking elements in existing array
                  // var course = {
                  //   "subject_code": "","subject_desc":""
                  // };
                  // course.subject_code = items[i].class_details[j].subject_code;
                  // course.subject_desc = items[i].class_details[j].subject_desc;
                  // console.log(course);
                  // checkArray(course)
                  // .then(finalArray => {
                  //   lookup_array = finalArray;
                  //   resolve(lookup_array);
                  //   if(i == m){
                  //     console.log('lookup_array :: %j',lookup_array);
                  //     resolve(lookup_array);
                  //   }
                  // })
                  // .catch(err => {
                  //   console.error('error while reading sections from DB: %s: %s ', err, err.stack);
                  //       reject(err);
                  // })
              // End of trying Sub functions - checking elements in existing array

                }

              }

           }
         // Trial of array.prototype.find()
           // for(var i=0; i<=m; i++){
           //   if(items[i].class_details.length != 0){
           //      console.log('entered loop');
           //     for(var j=0;j<items[i].class_details.length;j++){
           //       var course = {
           //                "subject_code": "","subject_desc":""
           //              };
           //          course.subject_code = items[i].class_details[j].subject_code;
           //          course.subject_desc = items[i].class_details[j].subject_desc;
           //           console.log(course);
           //       findElementInArray(course)
           //       .then(finalArray => {
           //                lookup_array = finalArray;
           //                resolve(lookup_array);
           //                if(i == m){
           //                  console.log('lookup_array :: %j',lookup_array);
           //                  resolve(lookup_array);
           //                }
           //              })
           //              .catch(err => {
           //                console.error('error while reading sections from DB: %s: %s ', err, err.stack);
           //                    reject(err);
           //              })
           //      // classDetails_Array.push(items[i].class_details[j]);
           //     }
           //   }else{
           //     console.log("entered into else %j",classDetails_Array);
           //   }
           // }
         // End of trial for array.prototype.find()
      });

      contents.pipe(jsonContent);
  //    getClassDetails(req, res).then(result =>{resolve(result);}).catch(err => {throw err;});
  });
};

// Display Students by courses
// First tried to identify unique students
exports.getStudentIdsByCourses = (callback) => {
  return new Promise(
    (resolve, reject) => {
      jsonContent.on('data', function(pojo) {
          // => receive reconstructed POJO
          console.log("Student ID: %j", pojo[0].student_id);
          //  var lookup_array = [];
            var students_array = [];
           var items = pojo;
            console.log("Student ID1:"+ pojo[0].student_id);
           var m = items.toString("binary").length;
           console.log("m :: "+m);
           for (var item, i = 0; item = items[i++];) {
             if(students_array.length == 0){
               students_array.push(items[i].student_id);
             }else{
               var s_id = items[i].student_id;
               var n = students_array.length - 1;
               for(var k=0;k<students_array.length;k++){
                 if(students_array[k].student_id == s_id){
                   //console.log('Element already exists in Array');
                 }else{
                   students_array.push(s_id);
                 }
               }
               if((i == m) && (k == n)){
                 console.log('students_array :: %j',students_array);
                 resolve(students_array);
               }
             }

           }

      });

      contents.pipe(jsonContent);

  });
};
// End of displaying students id by courses

// function to get class details
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

// Function to create an array for unique courses
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

// Function to check element existence in array
var checkArray = (course) => {
  return new Promise(
    (resolve,reject)=>{
      // console.log('course :: '+course.subject_code);

      // console.log('finalArray'+finalArray.length);
      var fAL = finalArray.length;
      if(fAL == 0){
        finalArray.push(course);
      }else{
        for(var i=0;i<fAL;i++){

            if(finalArray[i].subject_code == course.subject_code){
              // console.log()
            }else{
              finalArray.push(course);
            }
            if(i == fAL){
              // console.log('finalArray :: %j',finalArray);
              resolve(finalArray);
            }

        }
      }

    });
};

//
// exports.getAllUniqueCourses = (callback) => {
//   return new Promise(
//     (resolve, reject) => {
//       jsonContent.on('data', function(pojo) {
//           // => receive reconstructed POJO
//           console.log("Student ID: %j", pojo[0].student_id);
//           //  var lookup_array = [];
//             var lookup_array = [];
//            var items = pojo;
//             console.log("Student ID1:"+ pojo[0].student_id);
//            var result = [];
//            var classDetails_Array = [];
//            var m = items.toString("binary").length;
//            console.log("m :: "+m);
//            for(var i=0; i<=m; i++){
//              if(items[i].class_details.length != 0){
//                 console.log('entered loop');
//                for(var j=0;j<items[i].class_details.length;j++){
//                  var course = {
//                           "subject_code": "","subject_desc":""
//                         };
//                     course.subject_code = items[i].class_details[j].subject_code;
//                     course.subject_desc = items[i].class_details[j].subject_desc;
//                      console.log(course);
//                  findElementInArray(course)
//                  .then(finalArray => {
//                           lookup_array = finalArray;
//                           resolve(lookup_array);
//                           if(i == m){
//                             console.log('lookup_array :: %j',lookup_array);
//                             resolve(lookup_array);
//                           }
//                         })
//                         .catch(err => {
//                           console.error('error while reading sections from DB: %s: %s ', err, err.stack);
//                               reject(err);
//                         })
//                 // classDetails_Array.push(items[i].class_details[j]);
//                }
//              }else{
//                console.log("entered into else %j",classDetails_Array);
//              }
//            }
//       });
//
//       contents.pipe(jsonContent);
//
//
//      // for (var item, i = 0; item = items[i++];) {
//      //    //  console.log(items[i].class_details);
//      //    if(items[i].class_details.length !== 0){
//      //      console.log("if loop");
//      //      for(var j=0;j<items[i].class_details.length;j++){
//      //        console.log("for loop: "+items[i].class_details[j].subject_code);
//      //        var course = {
//      //          "subject_code": "","subject_desc":""
//      //        };
//      //        course.subject_code = items[i].class_details[j].subject_code;
//      //        course.subject_desc = items[i].class_details[j].subject_desc;
//      //        console.log(course);
//      //        checkArray(course)
//      //        .then(finalArray => {
//      //          lookup_array = finalArray;
//      //          resolve(lookup_array);
//      //          if(i == m){
//      //            console.log('lookup_array :: %j',lookup_array);
//      //            resolve(lookup_array);
//      //          }
//      //        })
//      //        .catch(err => {
//      //          console.error('error while reading sections from DB: %s: %s ', err, err.stack);
//      //              reject(err);
//      //        })
//      //      }
//      //
//      //    }
//      //   // var name = item.name;
//      //   //
//      //   // if (!(name in lookup)) {
//      //   //   lookup[name] = 1;
//      //   //   result.push(name);
//      //   // }
//      //
//      // }
//
//       // SectionMaster.find()
//       //  .then(sections => { resolve(sections); })
//       //  .catch(err => {
//       //    console.error('error while reading sections from DB: %s: %s ', err, err.stack);
//       //    reject(err);
//       //  });
//   //    getClassDetails(req, res).then(result =>{resolve(result);}).catch(err => {throw err;});
//   });
// };


class Queue
{
    // Array is used to implement a Queue
    constructor()
    {
        this.items = [];
    }

    // Functions to be implemented
    // enqueue(item)
    // dequeue()
    // front()
    // isEmpty()
    // printQueue()
    enqueue(element)
    {
        // adding element to the queue
        this.items.push(element);
    };
    // dequeue function
    dequeue()
    {
        // removing element from the queue
        // returns underflow when called
        // on empty queue
        if(this.isEmpty())
            return "Underflow";
        return this.items.shift();
    };
    // front function
    front()
    {
        // returns the Front element of
        // the queue without removing it.
        if(this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    };
    // isEmpty function
isEmpty()
{
    // return true if the queue is empty.
    return this.items.length == 0;
}
    // printQueue function
    printQueue()
    {
        var str = "";
        for(var i = 0; i < this.items.length; i++)
            str += this.items[i] +" ";
        return str;
    };
};
