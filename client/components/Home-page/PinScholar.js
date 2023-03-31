import React from 'react'
import PushPinIcon from '@mui/icons-material/PushPin'
import { useState } from 'react';
import { grey,blue} from '@mui/material/colors'
import { axiosPrivate } from '@/pages/api/axios'

const PinScholar = (props) => {
    const [pin,setPin] = useState(props.pin)
    console.log("why")
    console.log("scholarID:",props.id,"Props.pin in Pinscholar:",props.pin)
    console.log("Active in Pinscholar:",pin)
    const handlePin = (e) => {
        e.preventDefault()
        if(!pin){
            axiosPrivate.patch(`/student/pin-scholarship/${props.std}`,{scholarshipID:props.id})
            setPin(true)
            console.log("In not active")
        }
        else{
            axiosPrivate.patch(`/student/unpin-scholarship/${props.std}`,{scholarshipID:props.id})
            setPin(false)
            console.log("In active")
        }
	};
	return (
        <PushPinIcon onClick={handlePin} sx={pin? {color:blue[800]}:{color:grey[700]}}/>
	)
}

export default PinScholar
