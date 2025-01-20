import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Table from "./components/Table";
import Form from "./components/Form";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Table with Sorting, Filtering and Excel Download</h1>
        <Table />
        <h2>Submit New Data</h2>
        <Form />
      </div>
    </Provider>
  );
};

export default App;
