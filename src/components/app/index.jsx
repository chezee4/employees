import { Component } from "react";
import { v4 as uuidv4 } from 'uuid';


import AppInfo from "../app-info";
import SearchPanel from "../search-panel";
import AppFilter from "../app-filter";
import EmployeesList from "../employees-list";
import EmployeesAddForm from "../employees-add-form";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id: uuidv4(),  name: "John C.", salary: 800, increase: false, rise:false },
        {id: uuidv4(),  name: "Alex M.", salary: 3000, increase: false, rise:false },
        {id: uuidv4(),  name: "Carl W.", salary: 5000, increase: false, rise:false },
      ],
    };
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return { data: data.filter((item) => item.id !== id) };
    });
  };

  addItem = (name, salary) => {
    this.setState(({ data }) => {
      return {
        data: [
          ...data,
          {
            id: uuidv4(),
            name,
            salary,
            increase: false,
            rise: false,
            
          },
        ],
      };
    });
  };
  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        return item;
      }),
    }));
  };

  render() {
    const employees = this.state.data.length;
    const increased = this.state.data.filter((item) => item.increase).length;
    return (
      <div className="app">
        <AppInfo employees={employees} increased={increased} />

        <div className="search-panel">
          <SearchPanel />
          <AppFilter />
        </div>

        <EmployeesList
          data={this.state.data}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
