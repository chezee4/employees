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
        {id: uuidv4(),  name: "Вадім Д.", salary: 6000, increase: true, rise:true },
        {id: uuidv4(),  name: "Рома К.", salary:  0.2, increase: false, rise:false },
        {id: uuidv4(),  name: "Злата П.", salary: 165, increase: false, rise:true },
        {id: uuidv4(),  name: "Надія З.", salary: 163, increase: false, rise:true },
        {id: uuidv4(),  name: "Паша Щ.", salary:  -404, increase: false, rise:false },
        {id: uuidv4(),  name: "Аліна В.", salary: 158, increase: false, rise:true },
        {id: uuidv4(),  name: "Слава Ч.", salary: 0.1, increase: false, rise:false },
      ],
      term: "",
      filter: "all"
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

  searchEmp = (items, term) => {
    if (term.length === 0) {
        return items;
    }

    return items.filter(item => {
        return item.name.indexOf(term) > -1
    })
}
  filterPost = (items, filter) => {
  switch (filter) {
      case 'rise':
          return items.filter(item => item.rise);
      case 'moreThen1000':
          return items.filter(item => item.salary > 1000);
      default:
          return items
  }
}
	onUpdateSearch = (term) => {
		this.setState({ term });
	}

  onFilterSelect = (filter) => {
    this.setState({filter});
}
  render() {
    const { data, term, filter} = this.state;
    const employees = this.state.data.length;
    const increased = data.filter((item) => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);
    return (
      <div className="app">
        <AppInfo employees={employees} increased={increased} />

        <div className="search-panel">
          <SearchPanel 
                   onUpdateSearch={this.onUpdateSearch}/>
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>

        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
