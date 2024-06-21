//  course information
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

//  assignment group
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

//  learner submission data
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

// We need a  *function to find learner by id

function findLearner(learners, id) {
  return learners.find(learner => learner.id === id);
}

// We need a *function to calculate score

  function calculateScore(submission, assignment) {
  const timesSubmitted = new Date(submission.submitted_at);
  const dueAt = new Date(assignment.due_at);
  const isLate = timesSubmitted > dueAt;
  const pointsPossible = assignment.points_possible;
  
  let score = submission.score;
  
  if (isLate) {
    score *= 0.9; // We need to reduce score by 10% if late
  
  const calculatedScore = score / pointsPossible;
  
  return calculatedScore.toFixed(2);
  }
  }
  

  // We need to reduce score by 10% if late
 // if (isLate) {
  //  score *= 0.9; 
  

// We need a function to get learner data
function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
  if (courseInfo.id !== assignmentGroup.course_id) {
    throw new Error('course id does not match');
  } // if they dont match an error will be thrown 

  // we need an empty *array 
  const result = [];
  


  // we need the forEach method to iterate over each item in the learnerSubmissions *array
  learnerSubmissions.forEach(submission => {
    let learner = findLearner(result, submission.learner_id);
    

    if (!learner) {
      // We need to create a new object representing a learner
      learner = { id: submission.learner_id };
      // we need to use the *push method to add a new learner 
      result.push(learner);
    }
    
    const assignment = assignmentGroup.assignments.find(a => a.id === submission.assignment_id);
    
    if (assignment.points_possible <= 0) {
      throw new Error('possible points not positive');
    }
    
    const score = calculateScore(submission, assignment);
    
    // We need to add line to keep track of the score
    learner[assignment.id] = score;
  });

  result.forEach(learner => {
    const assignmentScores = Object.values(learner).filter(value => !isNaN(value)).map(Number);
    // We need a line to extracts all the scores from the learner object



    if (assignmentScores.length > 0) {
      const totalScore = assignmentScores.reduce((acc, score) => acc + score, 0);
      const averageScore = totalScore / assignmentScores.length;
      learner.avg = averageScore.toFixed(2);
    } else {
      learner.avg = 'misc';
    }
  });

  return result;
}


try {
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(result);
} catch (error)

{
  console.log(error.message);
}





// function getLearnerData (courseInfo, groupAssignments, submissions) 
// try {
//    if (courseInfo.id !== assignmentGroup.course_id) {
//     // ^  above will throw error if they do not match  

// // We need an empty *array for the result of the data
//     const result = [];

// // We need to check if the // // // The provided course information.
// // //  A courseInfo Object
// const CourseInfo = {
//    

//   ////////////// Start Here ///////////


//   //We need to create our function
// function getLearnerData(courseInfo, groupAssignments, submissions) 


//     LearnerSubmissions.forEach(submission => {
//         learnerIdsSet.add(submission.learner_id);
// });
      
//       // Convert the Set to an array
//       const learnerIdsArray = Array.from(learnerIdsSet);
      
//       console.log(learnerIdsArray);




// // step 2 get the learners id, they need to be placed into an array 
// // step 3 extract the assignment that is not due 


//    // We need a function for assignments that aren't due yet
//    function getDueAssignments(assignments, currentDate) {
//     const now = new Date(currentDate);
//     return assignments.filter(assignment => new Date(assignment.due_at) <= now);
//   }

//   // data structure needed 

//   

// // // step 4 place the assignment inside a seperate array 

//     console.log(submission)


// // 

// // // step 1 calling the function of the objects above * make sure it is outside of the function 
// // getLearnerData ( CourseInfo, AssignmentGroup, LearnerSubmissions)

      


// // // const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
// //   //console.log(result);
      