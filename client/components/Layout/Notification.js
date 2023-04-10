import React from "react";
import { useState } from "react";
import {Badge , menuItemClasses, Tooltip}from "@mui/material";
import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import { IconButton, Button, Menu, MenuItem } from "@mui/material";

const notifications = [{
    id : 0,
    label : 'Notification 1'
},
{
    id :1,
    label : 'Notification2'
}]

const NotificationBell = ({badgeContent})=>{
    const newNotification = `You have ${badgeContent} new notifications !`;
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
          }}
          disableScrollLock={true}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiAvatar-root': {
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
							right: 14,
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
            <MenuItem onClick={handleClose}>{item.label}</MenuItem>
          ))}
        </Menu>
            </div>
            
    )
}

export default NotificationBell;