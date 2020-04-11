import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";

// relative imports

import {
  fetchQuizzes,
  fetchUsers,
  fetchUser,
  fetchAdmins,
  fetchQuizsets,
  fetchQuestions,
  fetchQuestion,
  fetchScores,
  fetchScore,
} from "../actions";
import Header from "../components/Header";
import HomePage from "../components/HomePage";
import NewQuiz from "./NewQuiz";
import EditQuiz from "./EditQuiz";
import Quizset from "../components/Quizset";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "../components/Profile";
import Scores from "../components/Scores";
import Score from "../components/Score";
import PlayQuiz from "./PlayQuiz";
import ScoreCard from "../components/ScoreCard";
import Notfound404 from "../components/404";
import ListQuizzes from "./ListQuizzes";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      quizId: null,
      loggedUser: null,
      isLogged: false,
      quizzes: null,
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchQuizzes());
    this.props.dispatch(fetchUsers());
    this.props.dispatch(fetchUser());
    this.props.dispatch(fetchAdmins());
    this.props.dispatch(fetchQuizsets());
    this.props.dispatch(fetchScores());
    this.props.dispatch(fetchScore());
    if (localStorage.token) {
      this.setState({ isLogged: true });
    }
  }

  updateState = (quizset) => {
    this.props.dispatch(fetchQuizsets());
    this.props.dispatch(fetchQuestions(quizset));
  };
  getQuizId = (id) => {
    this.setState({ quizId: id }, () => this.props.dispatch(fetchQuestion(id)));
  };
  currentLoggedUser = () => {
    this.props.dispatch(fetchUser());
  };

  handleLogin = (isLogged) => {
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
            text="User"
            URL={"/api/v1/users/login"}
            isLogged={this.handleLogin}
            currentUser={this.currentLoggedUser}
          />
        </Route>
        <Route path="/admins/login">
          <Login
            text="Admin"
            URL={"/api/v1/admins/login"}
            isLogged={this.handleLogin}
            currentUser={this.currentLoggedUser}
          />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route>
          <Notfound404 />
        </Route>
      </>
    );
  };

  protectedRoutes = (isAdmin) => {
    return (
      <>
        <Route path="/user">
          <>
            <Profile user={this.props.user} isLogged={this.handleLogin} />
          </>
        </Route>
        <Route exact path="/questions">
          <PlayQuiz isAdmin={isAdmin} />
        </Route>
        <Route path="/questions/scorecard">
          <ScoreCard />
        </Route>
        <Route path="/quizzes/view">
          <ListQuizzes isAdmin={isAdmin} />
        </Route>
        <Route exact path="/quizzes/edit">
          <EditQuiz quizId={this.state.quizId} updateState={this.updateState} />
        </Route>

        <Route path="/quizsets">
          <Quizset isAdmin={isAdmin} />
        </Route>
        <Route path="/quizzes/new">{isAdmin ? <NewQuiz /> : null}</Route>
        <Route path="/scores">
          <Scores />
        </Route>
        <Route path="/score">
          <Score />
        </Route>

        <Route exact path="/">
          <>
            <HomePage />
          </>
        </Route>
        {/* <Route path="*">
          <div>
            <center>Page Not Found!</center>
          </div>
        </Route> */}
        <Header isLoggedin={this.props.isLogged} isAdmin={isAdmin} />
      </>
    );
  };

  render() {
    let isAdmin =
      this.props.user &&
      this.props.user.success &&
      this.props.user.user.isAdmin;

    return (
      <>
        <main className="main">
          <Switch>
            {this.state.isLogged
              ? this.protectedRoutes(isAdmin)
              : this.publicRoutes()}
          </Switch>
        </main>
      </>
    );
  }
}

function mapStateToProps({ quizzes, users, admins }) {
  return {
    quizzes: quizzes.quizzes,
    quizsets: quizzes.quizsets,
    users,
    user: users.user,
    admins,
  };
}

export default connect(mapStateToProps)(Home);
