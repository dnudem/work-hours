//@flow

import React from 'react'
import BtnDelete from './BtnDelete'

const ProjectItem = (props) => (
    <li className="item">
    	<span className="name">{props.name}</span>
    	{props.hours ? <span className="hours">{props.hours}</span> : null}
    	<BtnDelete clickHandler={props.deleteHandler}/>
    </li>
)
export default ProjectItem