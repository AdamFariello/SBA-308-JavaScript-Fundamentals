// Main import
import {CourseInfo, AssignmentGroup, LearnerSubmissions} from "./import.main.mjs";
// Test imports
//import {CourseInfo, AssignmentGroup, LearnerSubmissions} from "./testImports/import.zero.mjs";



//function getLearnerData(CourseInfo, AssignmentGroup, [LearnerSubmission]) 
function getLearnerData(course, ag, submissions) {	
	const resultArray = []

	// Date functions
	function compareDates(beforeDate, afterDate) {
		const beforeDateObj = new Date(beforeDate)
		const afterDateObj  = new Date(afterDate)
		return beforeDateObj <= afterDateObj  
	}
	function isDueYet(assignment) {
		const assignmentDate = assignment.due_at
		const currDate = Date.now()
		return compareDates(assignmentDate, currDate)
	}


	// Get Properties functions
	function getAssignment(learnerSubmitId) {
		return AssignmentGroup.assignments.filter(e => {
			return e.id === learnerSubmitId  
		})[0] 
	}
	function getScoreAndPossiblePoints(LearnerSubmission, assignment) {
		//TODO add checks for zero
		//TODO add check for null (return zero?)

		//Get possible points
		const possiblePoints = assignment.points_possible

		//Checking if score works
		let score = LearnerSubmission.submission.score 
		const submittedDate = LearnerSubmission.submission.submitted_at
		const dueDate = assignment.due_at
		
		//Added this const to fill requirements
		const isSubmitBeforeDueDate = compareDates(submittedDate, dueDate)
		if (isSubmitBeforeDueDate !== true) {
			score -= (possiblePoints * 0.1)
		}

		//TODO Implement restricting division to specfic digit (?)
		return [score, possiblePoints]
	}


	// Main functions
	function enterAssigGradesAndAverage(result, submissionsArray) {
		//TODO: Clean up function, really sloppy
		let numerator = 0
		let denominator = 0
		let submission = null
		//for (submission of submissionsArray) {
		while (submissionsArray.length != 0) {
			submission = submissionsArray.pop()
			
			const key = Object.keys(submission)[0]
			const arr = submission[key]
	
			//Overkill, but added to make check clearer
			const score = arr[0]
			const possiblePoints = arr[1]

			if (possiblePoints === 0) {
				result[key] = 0
			} else {
				result[key] = score / possiblePoints
			}
			
			numerator += score 			
			denominator += possiblePoints 	
		}
		
		if (denominator === 0)  {
			result.avg = 0
		} else {
			result.avg = numerator / denominator 
		}
		return result
	}
		

	let result = {}
	let submissionsArray = []
	let LearnerSubmission = null
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
