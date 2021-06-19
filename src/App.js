import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navbar";
import Counters from "./components/counters";
import Alert from "react-bootstrap/Alert";
import {counters} from "./components/api";


class App extends Component {
  state = {
    error: null,
    loading: "LOADING ...",
    counters: [],
    totalPrecio: 0,
    alertShow: false
  };
  constructor() {
    super();
    console.log("app - constructor");
  }
  componentDidMount() {
    // Llamada a la API simulada 
    counters().then(
      result => {
        this.setState({ loading: null, error: null, counters: result.counters });
      },
      error => {
        this.setState({ loading: null, error });
      }
    );
    // Ocultar mensaje alerta cada vez que se renderiza el componente
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

    // Actualizar total //
    // Obtener subTotal del item eliminado
    const deletedItem = this.state.counters.filter(
      (c) => c.id === counterId)[0];

    // Restar subtotal de producto al total del carrito
    const total = this.state.totalPrecio - deletedItem.subTotal;

    this.setState({ counters: counters, totalPrecio: total });
  };

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      // Resetaear cantidades
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
            error={this.state.error}
            loading={this.state.loading}
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
