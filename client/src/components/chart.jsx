import React, { Component } from "react";
import ReactGantt, { GanttRow } from "react-gantt";
import moment from "moment";
import axios from "axios";
import { apiUrl } from "../config.json";
class Chart extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    axios.get(apiUrl + `/product`).then(res => {
      this.setState({ products: res.data });
      let products = res.data;
      let newState = [];
      for (let product in products) {
        newState.push({
          id: products[product].id,
          Products: products[product].product,
          Quantity: products[product].quantity,
          date: products[product].createdAt
        });
      }
      this.setState({
        products: newState
      });
    });
  }

  render() {
    return (
      <ReactGantt
        templates={{
          myTasks: {
            title: "myTasks",
            steps: [
              {
                name: "Product Added",
                color: "#0099FF"
              }
            ]
          }
        }}
        leftBound={moment()
          .set({ hour: 0, date: 25, month: 0, year: 2020 })
          .toDate()}
        rightBound={moment()
          .set({ hour: 0, date: 3, month: 1, year: 2020 })
          .toDate()}
      >
        {this.state.products
          ? this.state.products.map(product => {
              if (product.date) {
                return (
                  <GanttRow
                    key={product.id}
                    title={product.Products}
                    templateName="myTasks"
                    steps={[
                      new Date(product.date),
                      moment(product.date).add(1, "days")._d
                    ]}
                  />
                );
              }
            })
          : "loading"}
      </ReactGantt>
    );
  }
}

export default Chart;
