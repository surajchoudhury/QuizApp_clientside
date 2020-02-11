import {
  SET_QUIZZES,
  SET_USERS,
  SET_USER,
  SET_ADMINS,
  SET_QUIZSETS,
  SET_QUESTIONS,
  SET_QUESTION,
  SET_SCORES,
  SET_SCORE,
  SET_QUIZSETTOPIC,
  SET_QUIZSET,
  SET_QUESTION_BY_TOPIC,
  SET_SCORE_TOPIC,
  SET_QUESTION_ID
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

function setQuizset(payload) {
  return {
    type: SET_QUIZSET,
    payload
  };
}
function setQuizsetTopic(payload) {
  return {
    type: SET_QUIZSETTOPIC,
    payload
  };
}

function setQuestionbyTopic(payload) {
  return {
    type: SET_QUESTION_BY_TOPIC,
    payload
  };
}

function setScoreTopic(payload) {
  return {
    type: SET_SCORE_TOPIC,
    payload
  };
}

function setQuestionId(payload) {
  return {
    type: SET_QUESTION_ID,
    payload
  };
}

export function fetchQuizzes() {
  return dispatch => {
    fetch("/api/v1/quizzes", {
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
    fetch("/api/v1/quizsets", {
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
    fetch(`/api/v1/quizzes/${topic}/questions`, {
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
    fetch(`/api/v1/quizzes/${id}`, {
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
    fetch(`/api/v1/user/scores`, {
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
    fetch(`/api/v1/user/score`, {
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
    fetch("/api/v1/users", {
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
    fetch("/api/v1/user", {
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
    fetch("/api/v1/admins", {
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

export function createQuizset(quizset) {
  return dispatch => {
    fetch("/api/v1/quizsets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      },
      body: JSON.stringify({
        topic: quizset
      })
    })
      .then(res => res.json())
      .then(quizset => {
        if (quizset.success) {
          dispatch(fetchQuizsets());
        }
      });
  };
}

export function deleteQuizset(id) {
  return dispatch => {
    fetch(`/api/v1/quizsets/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(quizset => {
        if (quizset.success) {
          dispatch(fetchQuizsets());
        }
      });
  };
}

export function createQuestion(topic, question, A, B, C, D, answer, history) {
  return dispatch => {
    fetch(`/api/v1/quizsets/${topic}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      },
      body: JSON.stringify({
        question,
        answer,
        options: {
          A,
          B,
          C,
          D
        }
      })
    })
      .then(res => res.json())
      .then(quiz => {
        if (quiz.success) {
          dispatch(fetchQuizsets());
          dispatch(fetchQuizsetbyTopic(topic));
          history.push("/quizsets");
        }
      });
  };
}

export function getQuizsetTopic(topic) {
  return dispatch => {
    dispatch(setQuizsetTopic(topic));
  };
}

export function fetchQuizsetbyTopic(topic) {
  return dispatch => {
    fetch(`/api/v1/quizsets/${topic}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(quizset => {
        if (quizset.success) {
          dispatch(setQuestionbyTopic(quizset));
        }
      });
  };
}

export function fetchQuizset(quizset) {
  return dispatch => {
    dispatch(setQuizset(quizset));
  };
}

export function getScoreTopic(data) {
  return dispatch => {
    dispatch(setScoreTopic(data));
  };
}

export function updateScore(score, quizset) {
  return dispatch => {
    fetch("/api/v1/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      },
      body: JSON.stringify({
        score,
        quizset
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.success) {
          dispatch(fetchScore());
        }
      });
  };
}

export function updateUser(username, email, profile) {
  return dispatch => {
    fetch("/api/v1/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      },
      body: JSON.stringify({
        // username,
        // email,
        profile
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.success) {
          dispatch(fetchUser());
        }
      });
  };
}

export function deleteQuestion(topic, id) {
  return dispatch => {
    fetch(`/api/v1/quizsets/${topic}/question/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(quizset => {
        if (quizset.success) {
          dispatch(fetchQuizsetbyTopic(topic));
          dispatch(fetchQuizsets());
        }
      });
  };
}

export function getQuestionId(id) {
  return dispatch => {
    dispatch(setQuestionId(id));
  };
}

export function updateQuizset(id, topic, history) {
  return dispatch => {
    fetch(`/api/v1/quizsets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      },
      body: JSON.stringify({
        topic
      })
    })
      .then(res => res.json())
      .then(quizset => {
        if (quizset.success) {
          dispatch(fetchQuizsets());
          history.push("/quizsets");
        }
      });
  };
}
export function editQuestion(id, question, answer, A, B, C, D, history, topic) {
  return dispatch => {
    fetch(`/api/v1/quizzes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      },
      body: JSON.stringify({
        question,
        answer,
        options: {
          A,
          B,
          C,
          D
        }
      })
    })
      .then(res => res.json())
      .then(question => {
        if (question.success) {
          dispatch(fetchQuizsetbyTopic(topic));
          history.push("/quizzes/view");
        }
      });
  };
}

export function completedByUsers(topic) {
  return dispatch => {
    fetch(`/api/v1/quizsets/${topic}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(quizset => {
        if (quizset.success) {
          dispatch(fetchQuizsets());
        }
      });
  };
}
