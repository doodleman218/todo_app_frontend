import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeQuest } from "../actions/quests";

export class HyruleCastle extends Component {
  handleDelete = (id) => {
    this.props.removeQuest(id);
  };

  renderQuests = () => {
    return this.props.quests
      .filter((questObj) => questObj.location === "Hyrule Castle")
      .map((questObj) => {
        return (
          <li key={questObj.id}>
            <a>{questObj.content}</a>
            <button>
              <Link to={`EditForm/${questObj.id}`}>Edit</Link>
            </button>
            <button onClick={() => this.handleDelete(questObj.id)}>
              Remove
            </button>
          </li>
        );
      });
  };

  render() {
    return (
      <div className="castlePage">
        <div className="quests-box">
          <span className="quests-title"> Hyrule Castle Quests </span>
          <span className="quests-container">{this.renderQuests()}</span>
          <br></br>
          <Link to="/Form/hyrule_castle">
            <button>Add a Quest</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { quests: state.quests };
};

const mapDispatchToProps = {
  removeQuest,
};

export default connect(mapStateToProps, mapDispatchToProps)(HyruleCastle);
