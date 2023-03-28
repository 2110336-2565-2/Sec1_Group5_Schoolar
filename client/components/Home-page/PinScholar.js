import React from 'react'
import PushPinIcon from '@mui/icons-material/PushPin'
import { useState } from 'react';
import { grey,blue} from '@mui/material/colors'
import { axiosPrivate } from '@/pages/api/axios'

const PinScholar = (props) => {
    const [active,setActive] = useState(false);
    const handlePin = (e) => {
        console.log(props.id)
        if(!active){
            axiosPrivate.patch(`/student/pin-scholarship/${props.std}`,{scholarshipID:props.id})
            setActive(true)
        }
        else{
            axiosPrivate.patch(`/student/unpin-scholarship/${props.std}`,{scholarshipID:props.id})
            setActive(false)
        }
	};
	return (
        <PushPinIcon onClick={handlePin} sx={active? {color:blue[800]}:{color:grey[700]}}/>
	)
}

export default PinScholar
