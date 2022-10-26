import React, { Component } from "react";
import GotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

import "./randomChar.css";
export default class RandomChar extends Component {
  constructor() {
    super();
    this.updateCharacter();
   }
  gotService = new GotService();
  state = {
    char: {},
    loading: true,
    error: false,
  };
  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };
  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    });
  };
  updateCharacter() {
    const id = Math.floor(Math.random() * 140 + 25); // 25 - 140

    this.gotService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  }
  render() {
    const { char, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;
    return (
      <div className="random-block rounded">
        {spinner}
        {errorMessage}
        {content}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, gender, died, born, culture } = char;

  return (
    <div className=" ">
      <h4>Random Character: {name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Gender</span>

          <span>{gender ? gender : "No data"}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Born</span>
          <span>{born ? born : "No data"}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Died</span>
          <span>{died ? died : "No data"}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Culture</span>
          <span>{culture ? culture : "No data"}</span>
        </li>
      </ul>
    </div>
  );
};
