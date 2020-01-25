import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

// relative imports

import {
  fetchQuizzes,
  fetchUsers,
  fetchAdmins,
  fetchQuizsets
} from "../actions";
import Header from "../components/Header";
import HomePage from "../components/HomePage";
import NewQuiz from "./NewQuiz";
import EditQuiz from "./EditQuiz";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "../components/Profile";
import ListQuizzes from "./ListQuizzes";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      quizId: null,
      loggedUser: null,
      isLogged: false,
      quizzes: null,
      quizsets: null
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchQuizzes());
    this.props.dispatch(fetchUsers());
    this.props.dispatch(fetchAdmins());
    this.props.dispatch(fetchQuizsets());

    fetch("http://localhost:3000/api/v1/quizzes", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(quizzes => {
        if (quizzes.success) {
          this.setState({ quizzes });
        }
      });

    fetch("http://localhost:3000/api/v1/user", {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(user => {
        if (user.success) {
          this.setState({ loggedUser: user });
        }
        if (localStorage.token) {
          this.setState({ isLogged: true });
        }
      });
  }

  updateState = topic => {
    this.props.dispatch(fetchQuizsets());
    fetch("http://localhost:3000/api/v1/quizzes", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(quizzes => {
        if (quizzes.success) {
          this.setState({ quizzes }, () => this.quizzesbyQuizsets(topic));
        }
      });
  };

  quizzesbyQuizsets = topic => {
    let filtered =
      this.state.quizzes &&
      this.state.quizzes.quizzes.filter(quiz => {
        return quiz.quizset.includes(topic);
      });
    this.setState({
      quizsets: filtered
    });
  };
  getQuizId = id => {
    this.setState({ quizId: id });
  };
  currentLoggedUser = () => {
    fetch("http://localhost:3000/api/v1/user", {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(user => {
        if (user.success) {
          this.setState({ loggedUser: user });
        }
      });
  };

  handleLogin = isLogged => {
    this.setState({ isLogged });
  };

  publicRoutes = () => {
    return (
      <>
        <Route path="/users/new">
          <Signup />
        </Route>
        <Route path="/users/login">
          <Login
            text="Users Login"
            URL={"http://localhost:3000/api/v1/users/login"}
            isLogged={this.handleLogin}
            currentUser={this.currentLoggedUser}
          />
        </Route>
        <Route path="/admins/login">
          <Login
            text="Admins Login"
            URL={"http://localhost:3000/api/v1/admins/login"}
            isLogged={this.handleLogin}
            currentUser={this.currentLoggedUser}
          />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
      </>
    );
  };

  protectedRoutes = isAdmin => {
    return (
      <>
        <Route path="/user">
          <Profile user={this.state.loggedUser} isLogged={this.handleLogin} />
        </Route>
        <Route exact path="/quizzes">
          <ListQuizzes
            user={this.state.loggedUser}
            currentUser={this.currentLoggedUser}
            updateState={this.updateState}
            isAdmin={isAdmin}
            getQuizId={this.getQuizId}
            quizzes={
              this.state.quizsets && this.state.quizsets.length
                ? this.state.quizsets
                : this.state.quizzes && this.state.quizzes.quizzes
            }
            quizzesbyQuizsets={this.quizzesbyQuizsets}
          />
        </Route>
        <Route exact path="/quizzes/edit">
          <EditQuiz quizId={this.state.quizId} updateState={this.updateState} />
        </Route>
        <Route path="/quizzes/new">
          {isAdmin ? <NewQuiz updateState={this.updateState} /> : ""}
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
      </>
    );
  };

  render() {
    let isAdmin =
      this.state.loggedUser &&
      this.state.loggedUser.success &&
      this.state.loggedUser.user.isAdmin;

    return (
      <>
        <Header isLoggedin={this.props.isLogged} isAdmin={isAdmin} />

        <Switch>
          {this.state.isLogged
            ? this.protectedRoutes(isAdmin)
            : this.publicRoutes()}
        </Switch>
      </>
    );
  }
}

function mapStateToProps({ quizzes, users, admins }) {
  return {
    quizzes: quizzes.quizzes,
    quizsets: quizzes.quizsets,
    users,
    admins
  };
}

export default connect(mapStateToProps)(Home);
