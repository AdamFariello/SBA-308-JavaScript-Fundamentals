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

	// Date functions
	function compareDates(beforeDate, afterDate) {
		const beforeDateObj = new Date(beforeDate)
		const afterDateObj  = new Date(afterDate)
		return beforeDateObj <= afterDateObj  
	}

	function submittedBeforeDeadline(learnerDate, assigDate) {
		if (compareDates(learnerDate,assigDate)) {
			return 1
		} else {
			//console.log("Late")
			//TODO: Figure if this can be using decmial math
			//		stackoverflow.com/questions/5037839
			return 0.9 //(1 - 0.1) 
		}
	}
	function isDueYet(assignment) {
		const assignmentDate = assignment.due_at
		const currDate = Date.now()
		return compareDates(assignmentDate, currDate)
	}


	// Get Properties functions
	function getAssignment(learnerSubmitId) {
		return assignment = AssignmentGroup.assignments.filter(e => {
			return e.id === learnerSubmitId  
		})[0] //TODO: In Obsidian, cover the usage of the [0] here
	}
	function getScoreAndPossiblePoints(LearnerSubmission, assignment) {
		//TODO add checks for zero
		//TODO add check for null (return zero?)

		//Checking if score works
		let score = LearnerSubmission.submission.score 
		const learnerDate = LearnerSubmission.submission.submitted_at
		const assigDate = assignment.due_at
		
		score *= (submittedBeforeDeadline(learnerDate, assigDate))


		//TODO Implement restricting division to specfic digit (?)
		const possiblePoints = assignment.points_possible
		return [score, possiblePoints]
	}


	// Main functions
	function enterAssigGradesAndAverage(result, submissionsArray) {
		//TODO: Clean up function, really sloppy
		let numerator = 0
		let denominator = 0
		for (submission of submissionsArray) {
			const key = Object.keys(submission)[0]
			const arr = submission[key]

			result[key] = arr[0] / arr[1]
			numerator += arr[0]
			denominator += arr[1]
		}
		result.avg = numerator / denominator 
		return result
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

		//TODO: Only sent he assingment id, and instead make the function
		//		only return the possible points
		const learnerSubmitId = LearnerSubmission.assignment_id
		const assignment = getAssignment(learnerSubmitId)
		if (isDueYet(assignment)) {
			const submission = {}
 			submission[learnerSubmitId] = getScoreAndPossiblePoints(
				LearnerSubmission, assignment
			)
			submissionsArray.push(submission)
		} else {
			continue	
		}
	}

	if (Object.keys(result).length !== 0) {
		result = enterAssigGradesAndAverage(result, submissionsArray)
		resultArray.push(result)
	}

	return resultArray
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result)
