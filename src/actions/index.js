import {
  SET_QUIZZES,
  SET_USERS,
  SET_USER,
  SET_ADMINS,
  SET_QUIZSETS,
  SET_QUESTIONS,
  SET_QUESTION,
  SET_SCORES,
  SET_SCORE
} from "../types";

function setQuizzes(payload) {
  return {
    type: SET_QUIZZES,
    payload
  };
}

function setUsers(payload) {
  return {
    type: SET_USERS,
    payload
  };
}

function setUser(payload) {
  return {
    type: SET_USER,
    payload
  };
}
function setAdmins(payload) {
  return {
    type: SET_ADMINS,
    payload
  };
}

function setQuizsets(payload) {
  return {
    type: SET_QUIZSETS,
    payload
  };
}
function setQuestions(payload) {
  return {
    type: SET_QUESTIONS,
    payload
  };
}
function setQuestion(payload) {
  return {
    type: SET_QUESTION,
    payload
  };
}

function setScores(payload) {
  return {
    type: SET_SCORES,
    payload
  };
}

function setScore(payload) {
  return {
    type: SET_SCORE,
    payload
  };
}

export function fetchQuizzes() {
  return dispatch => {
    fetch("http://localhost:3000/api/v1/quizzes", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(questions => {
        if (questions.success) {
          dispatch(setQuizzes(questions));
        }
      });
  };
}

export function fetchQuizsets() {
  return dispatch => {
    fetch("http://localhost:3000/api/v1/quizsets", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(quizsets => {
        if (quizsets.success) {
          dispatch(setQuizsets(quizsets));
        }
      });
  };
}

export function fetchQuestions(topic) {
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/quizzes/${topic}/questions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(quizset => {
        if (quizset.success) {
          dispatch(setQuestions(quizset));
        }
      });
  };
}

export function fetchQuestion(id) {
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/quizzes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(quiz => {
        if (quiz.success) {
          dispatch(setQuestion(quiz));
        }
      });
  };
}

export function fetchScores() {
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/user/scores`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(scores => {
        if (scores.success) {
          dispatch(setScores(scores));
        }
      });
  };
}

export function fetchScore() {
  return dispatch => {
    fetch(`http://localhost:3000/api/v1/user/score`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(score => {
        if (score.success) {
          dispatch(setScore(score));
        }
      });
  };
}

export function fetchUsers() {
  return dispatch => {
    fetch("http://localhost:3000/api/v1/users", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(users => {
        if (users.success) {
          dispatch(setUsers(users));
        }
      });
  };
}

export function fetchUser() {
  return dispatch => {
    fetch("http://localhost:3000/api/v1/user", {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(user => {
        if (user.success) {
          dispatch(setUser(user));
        }
      });
  };
}

export function fetchAdmins() {
  return dispatch => {
    fetch("http://localhost:3000/api/v1/admins", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(admins => {
        if (admins.success) {
          dispatch(setAdmins(admins));
        }
      });
  };
}
