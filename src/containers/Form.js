import React, { Component } from "react";
import { connect } from "react-redux";
import { addQuest } from "../actions/quests";

export class Form extends Component {
  state = {
    quest: "",
    location: "",
  };

componentDidMount(){
 let location = this.props.match.params.location.replace(/_/g," ").split(" ")
 let newLocation = location.map((s) => s.charAt(0).toUpperCase()+ s.substring(1)).join(' ')
 this.setState({
   location: newLocation
 })
 console.log(newLocation)
}
  
  handleDropChange = (event) => {
    this.setState({
      location: event.target.value,
    });
  };

  handleChange = (event) => {
    
    this.setState({
      quest: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let location_render = this.state.location.replace(/\s+/, "");

    const newQuest = {
      content: this.state.quest,
      location_name: this.state.location,
    };

    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quest: newQuest }),
    };

    fetch("http://localhost:3000/quests", reqObj)
      .then((resp) => resp.json())
      .then((quest) => {
        this.props.addQuest(quest);
        this.setState({
          quest: "",
          location: "",
        });
      });
    this.props.history.push(`/${location_render}`);
  };

  render() {
    console.log("hello", this.state.location)
    return (
     <div className="formPage">
      <div className="add-form">
        <form className="radioinput" onChange={this.handleDropChange}>
          <label>
            <input type="radio" value={"Hyrule Castle"}  checked={this.state.location === "Hyrule Castle"}  />
            Hyrule Castle
          </label>
          <label>
            <input type="radio" value={"Zoras Domain"} checked={this.state.location === "Zoras Domain"} />
            Zoras Domain
          </label>
          <label>
            <input type="radio" value={"Gerudo Desert"} checked={this.state.location === "Gerudo Desert"}/>
            Gerudo Desert
          </label>
        </form>
        <form className="text-form" onSubmit={this.handleSubmit}>
          <textarea
            className="new-quest-input"
            onChange={this.handleChange}
            placeholder=""
            type="text"
            value={this.state.quest}
          />
          <a>
            <button type="submit">Add Quest</button>
          </a>
        </form>
      </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addQuest,
};

const mapStateToProps = (state) => {
  return { quests: state.quests, locations: state.locations };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);

