import React from "react";
import {useRouter} from "next/router";
import { useState } from "react";
import { useEffect } from "react";

import {Badge , Grid, MenuList, Tooltip, Typography, Divider}from "@mui/material";
import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import AlarmOnRoundedIcon from '@mui/icons-material/AlarmOnRounded';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useAuth } from '@/context/AuthContext'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'


//Test data for notification
// const notifications = [{
//   id : 0,
//   type: 'fail',
//   label : 'Payment Fail',
//   scholarshipName : "Scholarship1",
//   description : "Your payment cannot be processed. Please verify your payment detail on the payment page.",
//   date : "12-01-2024"
// },
// {
//   id :1,
//   type: 'unactivate',
//   label : 'Scholarship not Activate',
//   scholarshipName : "Scholarship2",
//   description : "Please proceed the payment page to activate.",
//   date : "12-02-2024"
// },
// {
//   id :2,
//   type: 'reminder',
//   label : 'Payment Reminder',
//   scholarshipName : "Scholarship3",
//   description : "Your scholarship payment will be processed next week with a total of 99$.",
//   date : "12-03-2024"
// },{
//   id :3,
//   type: 'reminder',
//   label : 'Payment Reminder',
//   scholarshipName : "Scholarship3",
//   description : "Your scholarship payment will be processed next week with a total of 99$.",
//   date : "12-03-2024"
// },
// {
//   id :4,
//   type: 'reminder',
//   label : 'Payment Reminder',
//   scholarshipName : "Scholarship3",
//   description : "Your scholarship payment will be processed next week with a total of 99$.",
//   date : "12-03-2024"
// },
// {
//   id :5,
//   type: 'reminder',
//   label : 'Payment Reminder',
//   scholarshipName : "Scholarship3",
//   description : "Your scholarship payment will be processed next week with a total of 99$.",
//   date : "12-03-2024"
// },
// {
//   id : 6,
//   type: 'fail',
//   label : 'Payment Fail',
//   scholarshipName : "Scholarship1",
//   description : "Your payment cannot be processed. Please verify your payment detail on the payment page.",
//   date : "12-01-2024"
// }]
const changeDateToString = (date) => {
	if (!date) return null
	const dateObj = new Date(date)
	const day = dateObj.getDate()
	const monthIndex = dateObj.getMonth()
	const year = dateObj.getFullYear()
	const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	const monthName = monthNames[monthIndex]
	return `${day} ${monthName} ${year}`
}
// #######################################################################################
const textColor = {
  'Payment Fail': 'error',
  'Scholarship not Activate' : 'secondary',
  'Payment Reminder' : 'grey',
  'scholarship' : 'primary'
}

const iconNoti = {
  'Payment Fail': <CancelIcon color = 'error'/>,
  'Scholarship not Activate' : <ErrorRoundedIcon color ='secondary'/>,
  'Payment Reminder' : <AlarmOnRoundedIcon color = 'primary'/>,
}

const notiMessage = {
  'Payment Fail' : 'Your payment cannot be processed. Please verify your payment detail on the payment page.',
  'Scholarship not Activate' : 'Please proceed the payment page to activate.' ,
  'Payment Reminder' : 'Your scholarship payment will be processed next week with a total of 99$',
}

const notiHeader = {
  'fail' : 'Payment Fail',
  'unactivate' : 'Scholarship not Activate' ,
  'reminder' : 'Payment Reminder',
}

const NotificationBell = ()=>{
    const { auth } = useAuth()
    const [readStatus, setReadStatus] = useState(false)
    const router = useRouter()
    const axiosPrivate = useAxiosPrivate()
    const [anchorEl, setAnchorEl] = useState(null);
    const [readNoti, setReadNoti] = useState([])
    const [unreadNoti, setUnreadNoti] = useState([])
    const newNotification = `You have ${unreadNoti ? unreadNoti.length : 0} new notifications !`;
    const noNotification = "No new notifications";
    const open = Boolean(anchorEl);

    useEffect(()=>{

      async function fetchNoti(){
        try {
          const res = await axiosPrivate.get('/notification')
          const readArr = res.data.readed
          const unreadArr = res.data.unreaded

          // ********* set readed noti and get scholarshipName ******************
          // let retArr = []
          // for (let scholar of  readArr) {
          //     let obj = scholar
          //     try{
          //       const res = await axiosPrivate.get(`/scholarship/${obj._id}`)
          //       obj.scholarshipName = res.data.data.scholarshipName
          //     retArr.push(obj)}
          //     catch(err){
          //       console.log(err)
          //     }      
          // }
  
          setReadNoti(readArr)

          // ********* set unreaded noti and get scholarshipName ******************
          // let retArr2 = []
          // for (let scholar of  unreadArr) {
          //     let obj = scholar
          //     try{
          //       const res = await axiosPrivate.get(`/scholarship/${obj._id}`)
          //       obj.scholarshipName = res.data.data.scholarshipName
          //     retArr2.push(obj)}
          //     catch(err){
          //       console.log(err)
          //     }      
          // }
          setUnreadNoti(unreadArr)
        }catch (err){
          console.log(err)
        }
      }

      fetchNoti()

    }, [])
    const sendData = async () => {
      try {
        const response = await axiosPrivate.put('/notification')
        router.push('/')
      } catch (error) {
        console.error(error)
      }
    }
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
      if (!readStatus){
        setReadNoti([...readNoti,...unreadNoti])
        setUnreadNoti([])
        setReadStatus(true)
        sendData()

      }
    };

    return (
            <div>
            <Tooltip title = {unreadNoti && unreadNoti.length ? newNotification : noNotification }>
              <IconButton
              size="small"
              sx={{ ml: 1.5 }}
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={unreadNoti && readNoti ? handleClick : null}>
                    <Badge badgeContent = {unreadNoti && unreadNoti.length ? unreadNoti.length : 0}
                            color = 'error'>
                               <NotificationsNoneTwoToneIcon sx={{ width: 32, height: 32 }}/> 
                    </Badge>               
            </IconButton>  
            </Tooltip>
            <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
            sx: {
                maxWidth : 400,
                '& .MuiMenuItem-root': {
                  whiteSpace: 'normal',
                },
              }
      }
          }
          disableScrollLock={true}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiIcon-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 18,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
        keepMounted
        getContentAnchorEl={null}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
        
            <Grid container  sx={{ ml: '1rem', display: 'flex', flexWrap: 'wrap', maxWidth:'100'}} 
                direction="row"
                justifyContent="space-between"
                alignItems="center">
            <Grid item xs zeroMinWidth><Typography varaint = 'subtitle1' style={{overflowWrap: 'break-word', fontWeight: 'bold'}}>Notification {"("+`${unreadNoti.length && readNoti.length ? unreadNoti.length + readNoti.length : 0}`+")"} </Typography></Grid>
            <Grid item >
              <IconButton size="small"
                          sx={{ mr: '1.5rem' }}
                          onClick={handleClose}>
                      <CloseIcon sx = {{color :'grey'}}/>
                </IconButton>
              </Grid>
            </Grid>
          <Divider/>
          <MenuList style={{ maxHeight: 400, overflow: "auto" }}>
          {unreadNoti.length ? unreadNoti.map((item)=>(
            <MenuItem selected style={{whiteSpace: 'normal'}} 							
                    onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/payment`)}}>
                    <Grid item container
                                direction="column"
                                justifyContent="center"
                                alignItems="flex-start"
                                wrap="noWrap"
                                sx={{ display: 'flex', flexWrap: 'wrap', maxWidth:'100'}}>

                                <Grid item container direction="row" alignItems="center" gap={1}>
                                {iconNoti[item.message.split(' : ')[0]]} 
                                  <Typography style={{overflowWrap: 'break-word', fontWeight: 'bold' }} color = {textColor[item.message.split(' : ')[0]]}> {item.message.split(' : ')[1]} : </Typography>
                                  <Typography style={{overflowWrap: 'break-word', fontWeight: 'bold' }} color = {textColor[item.schoalrship]}> {item.message.split(' : ')[1]} </Typography>
                                </Grid>    
                                <Grid item xs zeroMinWidth  ><Typography gutterBottom variant="subtitle2" style={{overflowWrap: 'break-word'}}>{notiMessage[item.message.split(' : ')[0]]}</Typography></Grid>
                                <Grid item xs zeroMinWidth  ><Typography gutterBottom variant="subtitle2" style={{overflowWrap: 'break-word', color : 'grey'}}>{changeDateToString(item.timestamp)}</Typography></Grid>

                    </Grid>
            </MenuItem>
            
          )) : null}
          {readNoti.length ? readNoti.map((item)=>(
            <MenuItem focusVisible style={{whiteSpace: 'normal'}} 
                      onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/payment`)}}>
                    <Grid item container
                                direction="column"
                                justifyContent="center"
                                alignItems="flex-start"
                                wrap="noWrap"
                                sx={{ display: 'flex', flexWrap: 'wrap', maxWidth:'100'}}>

                                <Grid item container direction="row" alignItems="center" gap={1}>
                                {iconNoti[item.message.split(' : ')[0]]} 
                                  <Typography style={{overflowWrap: 'break-word', fontWeight: 'bold' }} color = {textColor[item.message.split(' : ')[0]]}> {item.message.split(' : ')[0]} : </Typography>
                                  <Typography style={{overflowWrap: 'break-word', fontWeight: 'bold' }} color = {textColor.scholarship}> {item.message.split(' : ')[1]} </Typography>
                                </Grid>    
                                <Grid item xs zeroMinWidth  ><Typography gutterBottom variant="subtitle2" style={{overflowWrap: 'break-word'}}>{notiMessage[item.message.split(' : ')[0]]}</Typography></Grid>
                                <Grid item xs zeroMinWidth  ><Typography gutterBottom variant="subtitle2" style={{overflowWrap: 'break-word', color : 'grey'}}>{changeDateToString(item.timestamp)}</Typography></Grid>

                    </Grid>
            </MenuItem>
            
          )) : null}
          </MenuList>
          
          
        </Menu>
            </div>
            
    )
}

export default NotificationBell;