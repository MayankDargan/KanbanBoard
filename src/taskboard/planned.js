import React,{Component} from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import Form from 'react-bootstrap/Form'

let _ = require('lodash');

class Planned extends Component{
    constructor(props){
        super(props);
        this.state={
            show: false,
            handleclose: true,
            openModal: false,
            taskName:'',
            dueDate: null, 
            assignedTo:'',
            task: null
        }
        this.updateTask = this.updateTask.bind(this);
        this.addTask = this.addTask.bind(this);
        this.hideAddTaskModal = this.hideAddTaskModal.bind(this);
        this.saveTask = this.saveTask.bind(this);
    }

    handleDoubelClick(ctx,id){
        let task = _.filter(JSON.parse(localStorage.getItem('tasks')), (task) => task.id === ctx );
        console.log(task);
        this.setState({show: true,selectedTask:task[0]});
    }

    hideModal = () => {
        this.setState({ show: false });
    };

    handleChange(date){
        this.setState(prevState => {
            let selectedTask = Object.assign({}, prevState.selectedTask);
            selectedTask.dueDate = date;
            return { selectedTask };
          });
    }

    assginedToChange(ctx,assignedTo){
        let updatedAssignment = assignedTo.currentTarget.value;
        this.setState(prevState => {
            let selectedTask = Object.assign({}, prevState.selectedTask);  
            selectedTask.assignedTo = updatedAssignment;    
            return { selectedTask };
          });
    }

    updateTask(){
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        _.remove(tasks,{"id":this.state.selectedTask.id});
        tasks.push(this.state.selectedTask);
        localStorage.removeItem('tasks');
        localStorage.setItem('tasks',JSON.stringify(tasks));
        this.setState({
            show: false
        });
    }

    addTask(){
        this.setState({
            openModal: true
        });
    }

    hideAddTaskModal(){
        this.setState({
            openModal: false
        });
    }

    onDateChange(date){
        this.setState({
            dueDate: date
        });
    }
    taskName(name){
        this.setState({
            taskName : name.currentTarget.value
        });
    }

    assigning(assign){
        this.setState({
            assignedTo: assign.currentTarget.value
        });
    }
    saveTask(){
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        let id = tasks.length +1;
        let newTask ={
            id: id,
            name: this.state.taskName,
            assignedTo: this.state.assignedTo,
            dueDate  : this.state.dueDate,
            status: 'Planned'
        }
        tasks.push(newTask);
        localStorage.removeItem('tasks');
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }

    render(){
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        let plannedTasks = _.filter(tasks, (task)=>task.status === 'Planned');
        let taskList = [];
        let title ='';
        let dueDate = '';
        let assignedTo = '';
        if(this.state.selectedTask !== undefined){
            title = this.state.selectedTask.name;
            dueDate = new Date(this.state.selectedTask.dueDate);
            assignedTo = this.state.selectedTask.assignedTo;
        }
        plannedTasks.map(task =>
            taskList.push(
                <Card key={task.id} style={{ width: '100%', marginBottom: '5%' }} id={task.id} onDoubleClick={this.handleDoubelClick.bind(this,task.id)}>
                        <Card.Body style={{textAlign:'left'}}>
                            <Card.Title>{task.name}</Card.Title>
                            <Card.Text>
                                Due: {task.dueDate}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <span>{task.assignedTo}</span>
                            <FontAwesomeIcon icon={faUserCircle} style={{fontSize:'30px',float:'right',background:'none'}}/>
                        </Card.Footer>
                    </Card>
            )
        )
        return(
            <div className="task-status">
                <Modal show={this.state.show} handleclose={this.hideModal} >
                    <Modal.Header>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Due date:</Form.Label>
                            <DatePicker selected={dueDate} dateFormat="dd/MM/yyyy" onChange={date=>this.handleChange(date)} ></DatePicker>
                            
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Due date:</Form.Label>
                            <Form.Control type="text" placeholder="Assigned to" value={assignedTo} onChange={assigned => this.assginedToChange(this,assigned)}></Form.Control>
                        </Form.Group>
                    </Form>
                         
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick = {this.updateTask}>Save</Button>
                        <Button variant="secondary" onClick={this.hideModal}>
                        Close
                        </Button>
                        
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.openModal} handleclose={this.hideModal} >
                    <Modal.Header>
                        <Modal.Title>Add new task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form onSubmit={this.saveTask}>
                    <Form.Group controlId="taskname">
                            <Form.Label>Task name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter task name" onChange={name=>this.taskName(name)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="duedate">
                            <Form.Label>Due date:</Form.Label>
                            <DatePicker selected={this.state.dueDate} dateFormat="dd/MM/yyyy" onChange ={date =>this.onDateChange(date)}></DatePicker>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Assign to:</Form.Label>
                            <Form.Control type="text" placeholder="Assigned to" onChange={assign=>this.assigning(assign)}></Form.Control>
                        </Form.Group>
                        <input variant="primary" type="submit" value="Save" />
                    </Form>
                         
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hideAddTaskModal}>
                        Close
                        </Button>
                        
                    </Modal.Footer>
                </Modal>
                <div>
                    <h4>Planned</h4>
                </div>
                <div className="task-container">
                    {taskList}
                    <a onClick={this.addTask}>Add another task <FontAwesomeIcon icon={faPlusCircle}/></a>
                </div>
            </div>
        )
    }
}

export default Planned;