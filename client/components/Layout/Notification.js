import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import {Badge , Grid, MenuList, Tooltip, Typography, Divider}from "@mui/material";
import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import AlarmOnRoundedIcon from '@mui/icons-material/AlarmOnRounded';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Menu, MenuItem } from "@mui/material";


//Test data for notification
const notifications = [{
  id : 0,
  type: 'fail',
  label : 'Payment Fail',
  scholarshipName : "Scholarship1",
  description : "Your payment cannot be processed. Please verify your payment detail on the payment page.",
  date : "12-01-2024"
},
{
  id :1,
  type: 'unactivate',
  label : 'Scholarship not Activate',
  scholarshipName : "Scholarship2",
  description : "Please proceed the payment page to activate.",
  date : "12-02-2024"
},
{
  id :2,
  type: 'reminder',
  label : 'Payment Reminder',
  scholarshipName : "Scholarship3",
  description : "Your scholarship payment will be processed next week with a total of 99$.",
  date : "12-03-2024"
},{
  id :3,
  type: 'reminder',
  label : 'Payment Reminder',
  scholarshipName : "Scholarship3",
  description : "Your scholarship payment will be processed next week with a total of 99$.",
  date : "12-03-2024"
},
{
  id :4,
  type: 'reminder',
  label : 'Payment Reminder',
  scholarshipName : "Scholarship3",
  description : "Your scholarship payment will be processed next week with a total of 99$.",
  date : "12-03-2024"
},
{
  id :5,
  type: 'reminder',
  label : 'Payment Reminder',
  scholarshipName : "Scholarship3",
  description : "Your scholarship payment will be processed next week with a total of 99$.",
  date : "12-03-2024"
},
{
  id : 6,
  type: 'fail',
  label : 'Payment Fail',
  scholarshipName : "Scholarship1",
  description : "Your payment cannot be processed. Please verify your payment detail on the payment page.",
  date : "12-01-2024"
}]
// #######################################################################################
const textColor = {
  'fail': 'error',
  'unactivate' : 'secondary',
  'reminder' : 'grey',
  'scholarship' : 'primary'
}

const iconNoti = {
  'fail': <CancelIcon color = 'error'/>,
  'unactivate' : <ErrorRoundedIcon color ='secondary'/>,
  'reminder' : <AlarmOnRoundedIcon color = 'primary'/>,
}


const NotificationBell = ({badgeContent})=>{
    const newNotification = `You have ${notifications.length} new notifications !`;
    const noNotification = "No new notifications";
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
            <div>
            <Tooltip title = {notifications.length ? newNotification : noNotification }>
              <IconButton
              size="small"
              sx={{ ml: 1.5 }}
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={notifications.length ? handleClick : null}>
                    <Badge badgeContent = {notifications.length}
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
            <Grid item xs zeroMinWidth><Typography varaint = 'subtitle1' style={{overflowWrap: 'break-word', fontWeight: 'bold'}}>Notification {"("+notifications.length+")"} </Typography></Grid>
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
          {notifications.map((item)=>(
            <MenuItem focusVisible style={{whiteSpace: 'normal'}}>
                    <Grid item container
                                direction="column"
                                justifyContent="center"
                                alignItems="flex-start"
                                wrap="noWrap"
                                sx={{ display: 'flex', flexWrap: 'wrap', maxWidth:'100'}}>

                                <Grid item container direction="row" alignItems="center" gap={1}>
                                {iconNoti[item.type]} 
                                  <Typography style={{overflowWrap: 'break-word', fontWeight: 'bold' }} color = {textColor[item.type]}> {item.label} : </Typography>
                                  <Typography style={{overflowWrap: 'break-word', fontWeight: 'bold' }} color = {textColor.scholarship}> {item.scholarshipName} </Typography>
                                </Grid>    
                                <Grid item xs zeroMinWidth  ><Typography gutterBottom variant="subtitle2" style={{overflowWrap: 'break-word'}}>{item.description}</Typography></Grid>
                                <Grid item xs zeroMinWidth  ><Typography gutterBottom variant="subtitle2" style={{overflowWrap: 'break-word', color : 'grey'}}>{item.date}</Typography></Grid>

                    </Grid>
            </MenuItem>
          ))}
          </MenuList>
          
          
        </Menu>
            </div>
            
    )
}

export default NotificationBell;