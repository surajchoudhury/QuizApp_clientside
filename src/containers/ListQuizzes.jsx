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
            <div className="Tall-tile is-danger my_tall_tile">
              <Quizset quizzesbyQuizsets={this.props.quizzesbyQuizsets} />
            </div>
            <div>
              <Quiz
                getQuizId={this.props.getQuizId}
                updateState={this.props.updateState}
                isAdmin={this.props.isAdmin}
                quizzes={this.props.quizzes}
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
          ""
        )}
      </>
    );
  }
}

function mapStateTorops({ users }) {
  return {
    users: users.users.users
  };
}
export default connect(mapStateTorops)(ListQuizzes);
