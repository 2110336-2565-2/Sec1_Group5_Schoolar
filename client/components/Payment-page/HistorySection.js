import { Center } from "@components/common"
import { Box, Stack, Typography, Button, Divider, Grid, Chip, Icon } from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

const HistorySection = () => {
    const {auth} = useAuth();
    const router = useRouter();
    //set subscription
    const [subscription, setSubscription] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    //Check if user logout
    if(!auth){
        router.push("/login");
    }
    //Check if user is provider, if not cannot access this page
    useEffect(() => {
        axiosPrivate.get(`/subscription/payment-history`).then((res) => {
            setSubscription(res.data);
			console.log(res.data);
		})
		if (auth && auth.role !== 'provider') {
            router.push("/");
		}	
	}, [])

    const changeDateToString = (date) => {
		const day = date.getDate();
		const monthIndex = date.getMonth();
		const year = date.getFullYear();
		const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		const monthName = monthNames[monthIndex];
		return `${day} ${monthName} ${year}`;
	}

    // Example data
    /*
    [
    {
        "id": "pi_3Mqc7wCn18gHMRof15OlcTUr",
        "created": "2023-03-28T12:59:52.000Z",
        "amount": 9900,
        "currency": "thb"
    },
    {
        "id": "pi_3MqISmCn18gHMRof1RGLaDl8",
        "created": "2023-03-27T16:00:04.000Z",
        "amount": 9900,
        "currency": "thb"
    },
    {
        "id": "pi_3MqIKaCn18gHMRof1ex72SyD",
        "created": "2023-03-27T15:51:36.000Z",
        "amount": 9900,
        "currency": "thb"
    },
    {
        "id": "pi_3MqHcKCn18gHMRof02jduwIB",
        "created": "2023-03-27T15:05:52.000Z",
        "amount": 9900,
        "currency": "thb"
    },
    {
        "id": "pi_3MqEMWCn18gHMRof0rvSogjT",
        "created": "2023-03-27T11:37:20.000Z",
        "amount": 9900,
        "currency": "thb"
    },
    {
        "id": "pi_3MqEHGCn18gHMRof0k1YYDdM",
        "created": "2023-03-27T11:31:54.000Z",
        "amount": 9900,
        "currency": "thb"
    },
    {
        "id": "pi_3MqDe9Cn18gHMRof0OHeZUqo",
        "created": "2023-03-27T10:51:29.000Z",
        "amount": 9900,
        "currency": "thb"
    },
    {
        "id": "pi_3MomNhCn18gHMRof0a7Ygvcl",
        "created": "2023-03-23T11:32:33.000Z",
        "amount": 9900,
        "currency": "thb"
    },
    {
        "id": "pi_3MnPsbCn18gHMRof0aPeRHt1",
        "created": "2023-03-19T17:18:49.000Z",
        "amount": 9900,
        "currency": "thb"
    },
    {
        "id": "pi_3MnOvjCn18gHMRof0kkKXn0F",
        "created": "2023-03-19T16:17:59.000Z",
        "amount": 9900,
        "currency": "thb"
    }
]
    */
    
    const data = [{
        scholarship: "test1"
        , paid: [{ date: "21 July 2023  2:30pm", amountPaid: 0 }, { date: "21 July 2023  2:30pm", amountPaid: 10 },
        { date: "21 July 2023  2:30pm", amountPaid: 0 },
        { date: "21 July 2023  2:30pm", amountPaid: 0 },{ date: "21 July 2023  2:30pm", amountPaid: 0 },
        { date: "21 July 2023  2:30pm", amountPaid: 0 },{ date: "21 July 2023  2:30pm", amountPaid: 0 }, { date: "21 July 2023  2:30pm", amountPaid: 10 }]
    },
    {
        scholarship: "test2"
        , paid: [{ date: "21 July 2023  2:30pm", amountPaid: 0 }, { date: "21 July 2023  2:30pm", amountPaid: 10 },
        { date: "21 July 2023  2:30pm", amountPaid: 0 },
        { date: "21 July 2023  2:30pm", amountPaid: 0 }]
    },
    {
        scholarship: "test3"
        , paid: [{ date: "21 July 2023  2:30pm", amountPaid: 0 }, { date: "21 July 2023  2:30pm", amountPaid: 10 },
        { date: "21 July 2023  2:30pm", amountPaid: 0 },
        { date: "21 July 2023  2:30pm", amountPaid: 0 }]
    }];


    const ComponentDatePaid = ({ data }) => {
        return (<>
            {data.map((item,index)=>{
                return (
                    <Box key={index} sx={{
                        // width: "100%",
                        borderRadius: 5,
                        border: 1,
                        borderColor: 'black',
                        backgroundColor: 'primary.light',
                        p: 1,
                        m: {xs: 1, sm: 2}
                    }} >
                    <Grid container width="100%" spacing={2} justifyContent="space-between">
                        <Grid item xs={6}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <CalendarTodayIcon />
                                <Typography sx={{ typography: {xs: "body2", sm: "body1"}}}>{item.date}</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <CheckCircleIcon color="success" />
                                <Typography  sx={{ color: "green", typography: {xs: "body2", sm: "body1"} }}>Amount paid {item.amountPaid} baht</Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                    </Box>)

            })}
        </>)
        
    }

    const ComponentScholarshipPaid = ({data}) => {
        return (
            <Box sx={{
                minWidth: {xs: 300, sm: 480},
                maxHeight: 500,
                borderRadius: {xs: 7, sm: 5},
                backgroundColor: 'primary.light',
                boxShadow: 12,
                p: 2,
                overflow: "auto"
            }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: "center" }}>{data.scholarship}</Typography>
                <ComponentDatePaid data={data.paid} />
            </Box>
        )
    }

    return (
        <Center>
            <Box sx={{
                width: "90%",
                borderRadius: 5,
                backgroundColor: '#E5E5E5',
                boxShadow: 12,
                p: {xs: 2, sm:4},
                m: {xs: 3, sm: 3},
            }}>
                <Typography variant="h2" sx={{ fontWeight: 'bold' }}>History</Typography>
                <Stack direction="row" spacing={{xs: 2, sm: 3}} sx={{ m: 2, p:2 , overflow: "auto"}}>
                    {data.map((item,index)=>{
                return <ComponentScholarshipPaid key={index} data={item}/>
            })}
                   
                </Stack>

            </Box>
        </Center>
    )

}

export default HistorySection