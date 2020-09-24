import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../api/AuthService';
import TaskService from '../api/TaskService';
import Alert from './Alert';
import Spinner from './Spinner';

class TaskForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            task: {
                id: 0,
                description: "",
                whenToDo: ""
            }, 
            redirect: false,
            buttonName: "Cadastrar",
            alert: null,
            loading: false
        }

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    }
    
    onSubmitHandler(event) {
        event.preventDefault();
        TaskService.save(this.state.task);
        this.setState({ redirect: true });
    }

    onInputChangeHandler(event) {
        const field = event.target.name;
        const value = event.target.value;

        this.setState(prevState => ({ task: { ...prevState.task, [field]: value }}));
    }

    componentDidMount() {
        const editId = this.props.match.params.id;
        if (editId) {
            this.setState({ loading: true })
            TaskService.load(~~editId,
                task => this.setState({ task: task, loading: false, buttonName: "Alterar" }),
                error => {
                    if (error.response) {
                    
                        if (error.response.status === 404) {
                            this.setErrorState("OPS! Não encontramos nenhuma tarefa...");
                        } else {
                            this.setErrorState(`OPS! Erro ao carregar dados: ${error.response}`);
                        }
                    
                    } else {
                        this.setErrorState({ alert: `Erro na requisição: ${error.message}`, loading: false })
                    }
                });
        }
    }

    setErrorState(error) {
        this.setState({ alert: error, loading: false })
    }

    render() {
        if (!AuthService.isAuthenticated()) {
            return <Redirect to="/login"/>
        }

        if (this.state.redirect) {
            return <Redirect to ="/" />
        }

        if (this.state.loading) {
            return <Spinner />
        }

        return (
            <div className="container">
                <h1>Cadastro da Tarefa</h1>
                { this.state.alert != null ? <Alert message={this.state.alert} /> : "" }
                <form onSubmit={this.onSubmitHandler}>
                    <div className="form-group">
                        
                        <label htmlFor="description">Descrição</label>
                        <input 
                            type="text"
                            className="form-control"
                            name="description"
                            value={ this.state.task.description }
                            placeholder="Digite a descrição da tarefa..." 
                            onChange={this.onInputChangeHandler}   
                        />
                    </div>
                    <div className="form-group">

                        <label htmlFor="whenToDo">Data</label>
                        <input 
                            type="date"
                            className="form-control"
                            name="whenToDo"
                            value={ this.state.task.whenToDo }
                            placeholder="Digite a data da tarefa..."
                            onChange={this.onInputChangeHandler}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">{this.state.buttonName}</button>
                    &nbsp; &nbsp;
                    <button type="button" className="btn btn-danger" onClick={() => this.setState({ redirect: true })}>Cancelar</button>
                </form>
            </div>
        );
    }
}

export default TaskForm;