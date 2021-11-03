import './App.css';
import React from "react";
import {
	Avatar,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography
} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const dataTimeFrames = ["daily", "weekly", "monthly"]

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timeTrackData: null,
			currentFrame: "daily"
		}
	}

	componentDidMount() {
		this.fetchData()
	}

	fetchData = () => {
		fetch("data.json").then(res => res.json()).then(res => {
			this.setState({
				timeTrackData: res
			})
		}).catch(err => {
			console.error(err)
		})
	}

	getDateSuffix = () => {
		const {currentFrame} = this.state
		let suffix
		if (currentFrame === "daily") {
			suffix = "Day"
		} else if (currentFrame === "weekly") {
			suffix = "Week"
		} else {
			suffix = "Month"
		}
		return suffix
	}

	getCardMediaBackgroundColor = (name) => {
		switch (name) {
			case "Work":
				return "hsl(15, 100%, 70%)"
			case "Play":
				return "hsl(195, 74%, 62%)"
			case "Study":
				return "hsl(348, 100%, 68%)"
			case "Exercise":
				return "hsl(145, 58%, 55%)"
			case "Social":
				return "hsl(264, 64%, 52%)"
			case "Self Care":
				return "hsl(43, 84%, 65%)"
			default:
				return "black"
		}
	}

	getIconName = (name) => {
		return `images/icon-${name.toLowerCase().replace(" ", "-")}.svg`
	}

	render() {
		const {timeTrackData, currentFrame} = this.state
		return (
			<div style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				margin: "auto 20%",
				padding: "15px"

			}}>
				<Grid container style={{flexWrap: "initial", position:"relative", left:"20px"}}>
					<Grid item xs={12} sm={3} md={3} lg={3}>
						<Card style={{backgroundColor: "hsl(246, 80%, 60%)",borderRadius: "40px/10px"}}>
							<CardHeader
								avatar={
									<Avatar alt="Jeremy Robson" src="images/image-jeremy.png"/>
								}
								style={{backgroundColor: "hsl(246, 80%, 60%)",borderRadius: "40px/10px"}}
							/>
							<CardContent style={{backgroundColor: "hsl(246, 80%, 60%)",borderRadius: "40px/10px"}}>
								<Typography variant={"inherit"} color={"hsl(236, 100%, 87%)"}>Report for</Typography>
								<Typography variant="h4" color="white">Jeremy Robson</Typography>
							</CardContent>
							<CardActions style={{backgroundColor: "hsl(235, 46%, 20%)",borderRadius: "40px/10px"}}>
								<List>
									{
										dataTimeFrames.map(frame => (
											<ListItem onClick={(e) => {
												this.setState({
													currentFrame: e.target.innerText.toLowerCase()
												})
											}}>
												<ListItemButton>
													<ListItemText
														primary={frame.charAt(0).toUpperCase() + frame.substr(1)}
														style={{color: "hsl(236, 100%, 87%)"}}
													/>
												</ListItemButton>
											</ListItem>
										))
									}
								</List>
							</CardActions>
						</Card>
					</Grid>
					<Grid container spacing={2}>
						{
							timeTrackData !== undefined && timeTrackData != null ? (
								timeTrackData.map(data => {
									return <Grid item xs={12} sm={4} md={4} lg={4}>
										<Card style={{backgroundColor: "hsl(226, 43%, 10%)",borderRadius: "40px/10px"}}>
											<CardMedia
												style={{
													backgroundColor: this.getCardMediaBackgroundColor(data.title),
													objectFit: "contain"
												}}
												component="img"
												src={this.getIconName(data.title)}
												height={50}
											/>
											<CardContent style={{
												backgroundColor: "hsl(235, 46%, 20%)",
												borderRadius: "40px/10px"
											}}>
												<div style={{display: "flex", justifyContent: "space-between"}}>
													<Typography style={{color: "white"}}>
														{data.title}
													</Typography>
													<MoreHorizIcon style={{color: "white"}}/>
												</div>
												<Typography variant="h3" style={{color: "white"}}>
													{data.timeframes[currentFrame].current + "hrs"}
												</Typography>
												<Typography variant="inherit" style={{color: "hsl(236, 100%, 87%)"}}>
													{
														"Last " + this.getDateSuffix() + " - " +
														data.timeframes[currentFrame].previous + "hrs"
													}
												</Typography>
											</CardContent>
										</Card>
									</Grid>
								})
							) : null
						}
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default App;
