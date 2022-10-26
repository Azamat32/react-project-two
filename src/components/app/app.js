import React, { Component } from "react";
import { Col, Row, Container, Button } from "reactstrap";
import "./app.css";
import CharDetails from "../charDetails/charDetails";
import Header from "../header";
import ItemList from "../itemList";
import RandomChar from "../randomChar";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      selectedChar: 130,
    };

    this.handleClick = (e) => {
      e.preventDefault();
      this.setState((state) => ({
        isToggleOn: !state.isToggleOn,
      }));
    };
    this.onCharSelected = (id) => {
      this.setState({
        selectedChar: id,
      });
    };
  }

  render() {
    const { isToggleOn } = this.state;

    return (
      <>
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg={{ size: 5, offset: 0 }}>
              {isToggleOn ? <RandomChar /> : null}
              <Button
                onClick={this.handleClick}
                type="submit"
                className="btn btn-info"
              >
                Toggle
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <ItemList onCharSelected={this.onCharSelected} />
            </Col>
            <Col md="6">
              <CharDetails charId={this.state.selectedChar} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
