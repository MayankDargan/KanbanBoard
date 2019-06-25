import React,{Component} from 'react';
import Planned from './planned';
import Started from './started';
import Done from './done';
import './taskboard.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import {tasks} from '../tasks.json';

class TaskBoard extends Component{
    render(){
        if(!localStorage.getItem('tasks')){
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        
        return(
            <div>
                <div>
                    <Col sm={4} style={{display: 'inline-block',marginTop:'1%',marginBottom:'1%'}}>
                        <div className="heading">
                            <span>
                                <h5>Task Board</h5>
                            </span>
                        </div>
                    </Col>
                    <Col sm={8} style={{display: 'inline-block',marginTop:'1%',marginBottom:'1%'}}>
                        <div className="members">
                            <span>Members:</span>
                            <div style={{display:'inline-block',width:'15%', textAlign:'left'}}>
                                <span style={{marginLeft:'2%'}}><FontAwesomeIcon icon={faUserCircle} style={{fontSize: '30px'}}/></span>
                                <span style={{marginLeft:'2%'}}><FontAwesomeIcon icon={faUserCircle} style={{fontSize: '30px'}} /></span>
                                <span style={{marginLeft:'2%'}}><FontAwesomeIcon icon={faUserCircle} style={{fontSize: '30px'}} /></span>
                            </div>
                        </div>
                    </Col>
                </div>
                <Row>
                    <Col sm={4}>
                        <Planned></Planned>
                    </Col>
                    <Col sm={4}>
                        <Started></Started>
                    </Col>
                    <Col sm={4}>
                        <Done></Done>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default TaskBoard;