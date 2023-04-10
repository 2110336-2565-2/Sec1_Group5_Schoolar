import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import {Badge , Grid, Tooltip, Typography}from "@mui/material";
import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import AlarmOnRoundedIcon from '@mui/icons-material/AlarmOnRounded';
import { IconButton, Menu, MenuItem } from "@mui/material";



const notifications = [{
  id : 0,
  type: 'fail',
  label : 'Payment Fail',
  scholarshipName : "Scholarship1",
  description : "Your payment cannot be processed. Please verify your payment detail on the payment page."
},
{
  id :1,
  type: 'unactivate',
  label : 'Scholarship not Activate',
  scholarshipName : "Scholarship2",
  description : "Please proceed the payment page to activate."
},
{
  id :2,
  type: 'reminder',
  label : 'Payment Reminder',
  scholarshipName : "Scholarship3",
  description : "Your scholarship payment will be processed next week with a total of 99$."
}]
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
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {notifications.map((item)=>(
            <MenuItem onClick={handleClose} style={{whiteSpace: 'normal'}}>
                    <Grid container
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

                    </Grid>
            </MenuItem>
          ))}
        </Menu>
            </div>
            
    )
}

export default NotificationBell;