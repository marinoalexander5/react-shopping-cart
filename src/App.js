import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navbar";
import Counters from "./components/counters";
import Alert from "react-bootstrap/Alert";

// usamos la NAVBAR de bootstrap
// https://getbootstrap.com/docs/5.0/components/navbar/

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 0, producto: "Tomates", precio: 120, subTotal: 0 },
      { id: 2, value: 0, producto: "Galletitas", precio: 250, subTotal: 0 },
      { id: 3, value: 0, producto: "Lata de Atun", precio: 380, subTotal: 0 },
      { id: 4, value: 0, producto: "Aquarius", precio: 270, subTotal: 0 },
    ],
    totalPrecio: 0,
    alertShow: false
  };
  constructor() {
    super();
    console.log("app - constructor");
  }
  componentDidMount() {
    // ajax call
    //this.setState({ movies });
    // ejemplo que devuelve un array vacio de props al browser
    // constructor (props){
    //   super(props);
    //   console.log('app - constructor', this.props);
    //   this.state=this.props.something;
    //   // no podemos usar setState dentro del constructor
    //  // this.setState();
    this.setState({alertShow: false})
  }
  handleIncrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter }; // clonamos el objeto recibido x parametro
    counters[index].value++;

    // Actualizar subTotales
    counters[index].subTotal = counters[index].value * counters[index].precio;

    // Actualizar total
    let total = this.state.totalPrecio;
    total += counter["precio"];

    this.setState({ counters: counters, totalPrecio: total });
  };
  handleDelete = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId);

    // Actualizar total
    // Obtener subTotal del item eliminado
    const deletedItem = this.state.counters.filter(
      (c) => c.id === counterId
    )[0];
    // Restar subtotal de producto al total del carrito
    const total = this.state.totalPrecio - deletedItem.subTotal;
    this.setState({ counters: counters, totalPrecio: total });
  };

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      // Resetear subtotales
      c.subTotal = 0;
      return c;
    });


    this.setState({ counters: counters, totalPrecio: 0 });
  };

  handleAlert = (value) => {
    this.setState({alertShow: value}) 
  }

  render() {
    // console.log('app - rendered');

    return (
      <React.Fragment>
        <NavBar
          totalPrecio={this.state.totalPrecio}
          totalCounters={this.state.counters.filter((c) => c.value > 0).length}
        />
        {this.state.alertShow && 
        <Alert variant="success" onClose={() => this.handleAlert(false)} dismissible>
          <Alert.Heading>
            Gracias por tu compra!
          </Alert.Heading>
        </Alert>}
        <main className="container">
          <Counters
            counters={this.state.counters}
            alertShow={this.state.alertShow}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDelete={this.handleDelete}
            handleAlert={this.handleAlert}
          />
        </main>
      </React.Fragment>
    );
  }
}
export default App;
