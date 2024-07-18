
// Calculate the consequences for late submissions
function calculateConsequences(dueDate, submissionDate, score) {
    const due = new Date(dueDate)
    const submitted = new Date(submissionDate)
    if (submitted > due) {
      return score * 0.1 // 10% penalty for late submissions
    }
    return 0 // No penalty if submitted on time
  }
  
  
  
  // // // we check that the assignment group belongs to the correct course
   function verifyCourse(info, group) {
    if (info.id !== group.course_id) {
      throw new Error("Sorry, Assignment does not belong!");
    }
    
   }
  
  function verifyAssignments(assignments) {
  
    
  }
  
        
  // Calculate scores/ averages for each learner
  function calculateScores(submissions, assignments) {
    const studentScores = {}
  
    // Process each submission
    for (const submission of submissions) {
      const learnerId = submission.learner_id
      const assignment = assignments.find(a => a.id === submission.assignment_id)
      const score = submission.submission.score
      const consequences = calculateConsequences(assignment.due_at, submission.submission.submitted_at, score);
  
  
  
      // Initialize student score entry 
      if (!studentScores[learnerId]) {
        studentScores[learnerId] = { totalScore: 0, penalties: 0, assignmentScores: {} }
      }
  
      // We need to update student score data
      studentScores[learnerId].totalScore += score - consequences
      studentScores[learnerId].penalties += consequences
      studentScores[learnerId].assignmentScores[assignment.id] = Math.round((score / assignment.points_possible) * 100)
    }
  
    // We need to calculate points possibe for assignments 
    const currentYear = new Date().getFullYear()
    const totalPossible = assignments
  
      .filter(a => new Date(a.due_at).getFullYear() <= currentYear)
  
      .reduce((acc, a) => acc + a.points_possible, 0) 
  
    // We need to create result array with averages and individual assignment scores
    const result = [];
    for (const learnerId in studentScores) {
      const scores = studentScores[learnerId]
      const avg = Math.round((scores.totalScore / totalPossible) * 100)     // We need to round the numbers
      result.push({
        id: learnerId,
        avg: avg,
        ...scores.assignmentScores
      });
    }
  
    return result;
  }
  
  // We create the function to process learner data
  function getLearnerData(info, group, submissions) {
    try {
      verifyCourse(info, group) // Check if the course and group match
    verifyAssignments(group.assignments) // Check for valid assignments
      const finalArray = calculateScores(submissions, group.assignments) // Calculate scores
      console.log(finalArray) // final results
  
  
  
  
      return finalArray
  
  
  
  
  
    } catch (error) {
      console.error(error.message)
  
  
  
      return error.message //  we are going to return error message if validation fails
    }
  }
  
  // The Provided data has been optimized*****
  const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      { id: 1, name: "Declare a Variable", due_at: "2023-01-25", points_possible: 50 },
      { id: 2, name: "Write a Function", due_at: "2023-02-27", points_possible: 150 },
      { id: 3, name: "Code the World", due_at: "3156-11-15", points_possible: 500 }
    ]
  };
  
  
  
  const LearnerSubmissions = [
    { learner_id: 125, assignment_id: 1, submission: { submitted_at: "2023-01-25", score: 47 } },
    { learner_id: 125, assignment_id: 2, submission: { submitted_at: "2023-02-12", score: 150 } },
    { learner_id: 125, assignment_id: 3, submission: { submitted_at: "2023-01-25", score: 400 } },
    { learner_id: 132, assignment_id: 1, submission: { submitted_at: "2023-01-24", score: 39 } },
    { learner_id: 132, assignment_id: 2, submission: { submitted_at: "2023-03-07", score: 140 } }
  ];
  
  
  
  
  
  
  getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)