import { SET_QUIZZES, SET_USERS, SET_ADMINS, SET_QUIZSETS } from "../types";

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

export function fetchQuizzes() {
  return dispatch => {
    fetch("http://localhost:3000/api/v1/quizzes", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(quizzes => {
        if (quizzes.success) {
          dispatch(setQuizzes(quizzes));
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

export function fetchUsers(props) {
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
