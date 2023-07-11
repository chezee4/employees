import { Component } from 'react';
import './employees-add-form.css';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: '',
            error_message: false
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {name, salary} = this.state
        if(name.length < 2 || !/^\+?[1-9][0-9]*$/.test(salary)){ 
            this.setState({
               error_message: true
            })
            return
        }

        this.props.onAdd(name, salary);
        this.setState({
            name: '',
            salary: '',
            error_message: false
        })
    }
    render() {
        const {name, salary, error_message} = this.state;
        let error_text = error_message? "error-text" : "error-text hiden"
        return (
             
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex"
                    onSubmit={this.onSubmit}>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Хто ти ?"
                        name="name"
                        value={name} 
                        onChange={this.onValueChange}/>
                    <input type="number"
                        className="form-control new-post-label red"
                        placeholder="З/П в $?"
                        name="salary"
                        value={salary} 
                        onChange={this.onValueChange}/>
    
                    <button type="submit"
                            className="btn btn-outline-light">Добавить</button>
                </form>
                 <p className={error_text}>Невірно введені дані </p>
            </div>
        )
    }
}

export default EmployeesAddForm;