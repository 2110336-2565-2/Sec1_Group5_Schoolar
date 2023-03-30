import React from 'react'
import PushPinIcon from '@mui/icons-material/PushPin'
import { useState } from 'react';
import { grey,blue} from '@mui/material/colors'
import { axiosPrivate } from '@/pages/api/axios'

const PinScholar = (props) => {
    const [active,setActive] = useState(props.pin);
    console.log("why")
    console.log("scholarID:",props.id,"Props.pin in Pinscholar:",props.pin)
    console.log("Active in Pinscholar:",active)
    const handlePin = (e) => {
        e.preventDefault()
        if(!active){
            axiosPrivate.patch(`/student/pin-scholarship/${props.std}`,{scholarshipID:props.id})
            setActive(true)
            console.log("In not active")
        }
        else{
            axiosPrivate.patch(`/student/unpin-scholarship/${props.std}`,{scholarshipID:props.id})
            setActive(false)
            console.log("In active")
        }
	};
	return (
        <PushPinIcon onClick={handlePin} sx={active? {color:blue[800]}:{color:grey[700]}}/>
	)
}

export default PinScholar
