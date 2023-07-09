import { Component } from "react";

import AppInfo from "../app-info";
import SearchPanel from "../search-panel";
import AppFilter from "../app-filter";
import EmployeesList from "../employees-list";
import EmployeesAddForm from "../employees-add-form";

import "./app.css";

class App  extends Component{

    constructor(props){
      super(props);
      this.state ={
        data : [
          { name: "John C.", salary: 800, increase: false, id:1},
          { name: "Alex M.", salary: 3000, increase: true, id:2 },
          { name: "Carl W.", salary: 5000, increase: false, id:3},
        ]
      }
    }

    deleteItem = (id) => {
      this.setState(({data}) => {
          return {data:data.filter(item => item.id !== id)}     
      })
    }

    addItem = (name, salary) => {
        this.setState(({data}) => {
            return {
                data: [
                      ...data,
                      {
                          name, 
                          salary,
                          increase: false,
                          id: ++data.length
                      }
                ]
            }
        });
  }

  
    render(){
       const {data} = this.state;
      return (
        <div className="app">
          <AppInfo />
    
          <div className="search-panel">
            <SearchPanel />
            <AppFilter />
          </div>
    
          <EmployeesList 
              data={data} 
              onDelete={this.deleteItem}
              />
          <EmployeesAddForm onAdd={this.addItem}/>
        </div>
      );
    }

}

export default App;
