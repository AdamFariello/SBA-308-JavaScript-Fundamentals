// The provided course information.
export const CourseInfo = {
  id: 451, //STRING CHECK
  name: "Introduction to JavaScript"
}

// The provided assignment group.
export const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451, //STRING CHECK
  group_weight: 25,

  assignments: [
    {
	  id: "1", //STRING CHECK, HAD TO FIX
      name: "Declare a Variable",
      due_at: "2023-01-25", //DATE CHECK, DATE OBJECT FINE
      //due_at: Date("2023-01-25"), //
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
}

// The provided learner submission data.
export const LearnerSubmissions = [
  {
  	//learner_id: 125, 
    learner_id: "125", //TODO CHECK FOR STRING, had to fix
    assignment_id: 1,
    submission: {
    submitted_at: "2023-01-25",
	//submitted_at: Date("2023-01-25"), //TODO check for date, GIVES CURRENT DATE IF USED
										//I'M NOT CHECKING FOR IMPROPER DATA INPUT LIKE THIS
										//stackoverflow.com/questions/39223481
      score: 47
     // score: "47" //TODO check for string
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
]
