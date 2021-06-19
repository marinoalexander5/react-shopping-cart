import React, { Component } from "react";
import Counter from "./counter";
import { GiTomato, GiWaterBottle } from "react-icons/gi";
import { FaFish, FaCookie } from "react-icons/fa";

// trabaja SIN ESTADO LOCAL en Counter
const icons = [<GiTomato />, <FaCookie />, <FaFish />, <GiWaterBottle />];

// Manejo de llamada a la API
const ErrorMessage = ({ error }) => (error ? <strong>{error}</strong> : null);
const LoadingMessage = ({ loading }) =>
  loading ? (
    <div className="col mt-5">
      <em>{loading}</em>
    </div>
  ) : null;

class Counters extends Component {
  render() {
    // console.log('counterss rendered');
    return (
      <div className="wrapper">
        <div className="row font-weight-bold mb-2">
          <div className="col">Item</div>
          <div className="col">Price</div>
          <div className="col">Subtotal</div>
          <div className="col">Quantity</div>
          <div className="col-4"></div>
        </div>

        <ErrorMessage error={this.props.error} />
        <LoadingMessage loading={this.props.loading} />

        {this.props.counters.map((counter) => (
          <Counter
            key={counter.id}
            alertShow={this.props.alertShow}
            handleAlert={this.props.handleAlert}
            onDelete={this.props.onDelete}
            onIncrement={this.props.onIncrement}
            counter={counter}
            icons={icons[counter.id - 1]}
          />
        ))}
        <div className="d-flex justify-content-end p-5 mr-5">
          <button
            onClick={this.props.onReset}
            className="btn btn-primary btn-sm m-2"
          >
            Reset
          </button>
          <button
            className="btn btn-success btn-sm m-2"
            onClick={() => this.props.handleAlert(true)}
          >
            Checkout
          </button>
        </div>
      </div>
    );
  }
}

export default Counters;
