//@flow

import React from 'react'

const ProjectInput = (props) => (
    <input className="text-ipt" type="text" onKeyUp={props.keyUpHandler} placeholder={props.placeholder}/>
)
export default ProjectInput