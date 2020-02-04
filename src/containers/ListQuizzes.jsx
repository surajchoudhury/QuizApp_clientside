import React from "react";
import { connect } from "react-redux";

// relative
import Quiz from "../components/Quiz";
import Quizset from "../components/Quizset";

class ListQuizzes extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        {this.props.users ? (
          <div className="my_container2">
            <div className=" my_tall_tile">
              <Quizset />
            </div>
            <div>
              <Quiz
                currentUser={this.props.currentUser}
                getQuizId={this.props.getQuizId}
                updateState={this.props.updateState}
                isAdmin={this.props.isAdmin}
              />
            </div>
            <div className="all_users_container">
              {this.props.users.map(user => (
                <>
                  <p className="username">{user.username}</p>
                  <p className="user_email">{user.email}</p>
                </>
              ))}
            </div>
          </div>
        ) : (
          <p className="loading">Loading....</p>
        )}
      </>
    );
  }
}

function mapStateTorops({ users }) {
  return {
    users: users.users && users.users.users
  };
}
export default connect(mapStateTorops)(ListQuizzes);
