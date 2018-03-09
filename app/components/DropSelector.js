//@flow

import React from 'react'
const DropSelector =(props) => {
	const positionConfig= (targetElement) =>{
        let dir=""
        let transform={transform:"translate(0)"}
        if(targetElement===null){
            return {dir,transform}
        }
        let position
        let element = targetElement
        let bodyRect = document.body.getBoundingClientRect()
        let elemRect = element.getBoundingClientRect()
        let offset ={
            top:elemRect.top - bodyRect.top,
            bottom:bodyRect.bottom - elemRect.bottom,
            left:elemRect.left - bodyRect.left,
            right:bodyRect.right - elemRect.right
        }
        dir="arrow-left-"
        position=offset.left+"px,"
        if(offset.right<offset.left && element.offsetWidth<350){
            dir="arrow-right-"
            position=offset.left - 350 + element.offsetWidth +"px,"
        }
        if(offset.bottom>=offset.top){
            position+=offset.top+element.offsetHeight+10+"px"
            dir+="top"
        }else{
            if(offset.bottom>=260){
                position+=offset.top+element.offsetHeight+10+"px"
                dir+="top"
            }else{
                position+="calc("+offset.top+"px - 100% - 10px)"
                dir+="bottom"
            }
        }
        transform = {transform:"translate("+position+")"}
        return {dir,transform}
    }
	return (
		<div className={"drop-selector "+(props.isShow?"show ":" ")+positionConfig(props.targetElement).dir} style={positionConfig(props.targetElement).transform}>
		    <div className="scroll-blk">
		    {
		       props.items
		    }
		    </div>
		</div>
	)
}
export default DropSelector