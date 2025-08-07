const CourseInfo {
	"id": number,
	"name": string,
}

const AssignmentGroup {
	"id": number,
	"name": string,
				
	// the ID of the course the assignment group belongs to
	"course_id": number,

	// the percentage weight of the entire assignment group
	"group_weight": number,
	"assignments": [AssignmentInfo],
}

const AssignmentInfo {
	"id": number,
	"name": string,
				
	// the due date for the assignment
	"due_at": Date string,

	// the maximum points possible for the assignment
	"points_possible": number,
}

const LearnerSubmission {
	"learner_id": number,
	"assignment_id": number,
	"submission": {
		"submitted_at": Date string,
		"score": number
	}
}
let LearnerSubmissionArray = []

const DataFormat {
	// the ID of the learner for which this data has been collected
	"id": number,
	// the learner’s total, weighted average, in which assignments
	// with more points_possible should be counted for more
	// e.g. a learner with 50/100 on one assignment and 190/200 on another
	// would have a weighted average score of 240/300 = 80%.
	"avg": number,
	// each assignment should have a key with its ID,
	// and the value associated with it should be the percentage that
	// the learner scored on the assignment (submission.score / points_possible)
				
	//TODO: figure if this is proper format at all
	<assignment_id>: number,
	// if an assignment is not yet due, it should not be included in either
	// the average or the keyed dictionary of scores
}


//function getLearnerData(CourseInfo, AssignmentGroup, [LearnerSubmission]) 
function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0 // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833 // late: (140 - 15) / 150
    }
  ];

  return result;
}
