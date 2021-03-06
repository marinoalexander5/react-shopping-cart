import React, { Component } from "react";

class Counter extends Component {
  componentDidUpdate(prevProps, prevState) {
    // console.log('counter update');
    // console.log('prevProps', prevProps);
    // console.log('prevState', prevState);
    if (prevProps.counter.value !== this.props.counter.value) {
      this.props.alertShow && this.props.handleAlert(false);
    }
  }
  componentWillUnmount() {
    console.log("counter unmounted");
  }
  render() {
    // console.log('counter rendered');

    return (
      <div className="row align-items-center border ">
        <div className="col font-weight-bold">
          {this.props.counter.producto}
        </div>
        <div>{this.props.icons}</div>
        <div className="col font-weight-bold">
          $ {this.props.counter.precio}
        </div>
        <div className="col font-weight-bold">
          $ {this.props.counter.subTotal}
        </div>
        <div className="col">
          <span className={this.getBadgesClasses()}>{this.formatCount()}</span>
        </div>
        <div className="col">
          <button
            onClick={() => this.props.onIncrement(this.props.counter)}
            className="btn btn-secondary btn-sm"
          >
            Add to Cart
          </button>
        </div>
        <div className="col">
          <button
            onClick={() => this.props.onDelete(this.props.counter.id)}
            className="btn btn-danger btn-sm m-2"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  getBadgesClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }
  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Empty" : value;
  }
}
export default Counter;
