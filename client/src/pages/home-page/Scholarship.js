import { HStack, VStack } from '@components/common'
import FilterListIcon from '@mui/icons-material/FilterList'
import SearchIcon from '@mui/icons-material/Search'
import { Button, IconButton, InputBase, Paper, Typography, Divider, Box, Stack, Grid} from '@mui/material'
import { Container } from '@mui/system'
import PushPinIcon from '@mui/icons-material/PushPin'
import { grey } from '@mui/material/colors'
import { useState, useEffect } from 'react'

export function Scholarship() {
	const [scholars, setScholars] = useState([])

	useEffect(() => {
		setScholars([{name: 'S1', tag:['tag1','tag2']},{name: 'S2', tag:['tag3','tag4']}, {name: 'S3', tag:['tag5','tag6']}, {name: 'S4', tag:['tag7','tag8']}, {name: 'S5', tag:['tag9','tag10']}, {name: 'S6', tag:['tag11','tag12']}])
	}, [])

	return(
    <Grid container marginTop={2} marginBottom={4} gap="25px 50px" justifyContent="center">
        {scholars.map((scholar, idx) => {
            return (
                <Paper
                    key= {scholar.name + idx}
                    component="form"
                    sx={{ display: 'flex', width: 300, height: 180, flexDirection: "column" }}
                >
                    <Grid 
                        container 
                        direction="row" 
                        justifyContent= 'space-between'
                        >
                        <Typography margin={2} marginLeft={2} >
                            {scholar.name}
                        </Typography>
                        <Button
                            variant="text"
                            sx={{ display: 'flex', width: 50, height: 50 }}
                        >
                            <PushPinIcon sx={{ color: grey[900] }} />
                        </Button>
                    </Grid>
                    <Divider orientation="horizontal" borderBottomWidth= {2} />
                    <Grid margin={1}>
                        {scholar.tag.map((tag,idx) => {
                            return(
                                <div key={scholar.name + scholar.tag + idx}>
                                    <Box
                                        sx={{ display: 'flex', width: 60, height: 25, backgroundColor: '#e6edec', borderRadius: 1, margin: 1, marginLeft: 2}}
                                    >
                                        <Typography marginLeft={1} >
                                            {tag}
                                        </Typography>
                                    </Box>
                                </div>
                            )
                        })}
                        
                    </Grid>
                </Paper>
            )
        })}
    </Grid>
	)
}