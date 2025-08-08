// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
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

// The provided learner submission data.
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


//function getLearnerData(CourseInfo, AssignmentGroup, [LearnerSubmission]) 
function getLearnerData(course, ag, submissions) {	
	const resultArray = []
		
	function getAssignGrade(LearnerSubmission) {
		const assigID = LearnerSubmission.assignment_id

		const assignment = AssignmentGroup.assignments.filter(e => {
			return e.id === assigID  
		})

		//TODO check for if score is past due date (probably not checked here)
		//TODO add checks for zero
		//TODO add check for null (return zero?)

		//console.log(assignment.points_possible) //TODO: Cover in obsidian
		//console.log(assignment[0].points_possible)
			

		//TODO Implement restricting division to specfic digit (?)
		const score = LearnerSubmission.submission.score 
		const possiblePoints = assignment[0].points_possible
		return [score, possiblePoints]
	}

	function enterAssigGradesAndAverage(result, submissionsArray) {
		console.log("DEBUG")
		console.log(result)
		console.log(submissionsArray)
	}
		

	let result = {}
	let submissionsArray = []
	for (LearnerSubmission of LearnerSubmissions) {
		if (Object.keys(result).length !== 0 && 
			LearnerSubmission.learner_id !== result.id) {
			//TODO: Add function to caluclate average
			result = enterAssigGradesAndAverage(result, submissionsArray)
			resultArray.push(result)
			
			result = {}
			submissionsArray = [] 
		}
		if (Object.keys(result).length === 0) {
			result = {
				id: LearnerSubmission.learner_id,
				avg: null, 
			}
		}

		const assignId = LearnerSubmission.assignment_id
		const submission = {}
 		submission[assignId] = getAssignGrade(LearnerSubmission)
		submissionsArray.push(submission)
	}

	if (Object.keys(result).length !== 0) {
		//TODO: Add function to caluclate average
		resultArray.push(result)
		result = {}
	}

	return resultArray
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result)
