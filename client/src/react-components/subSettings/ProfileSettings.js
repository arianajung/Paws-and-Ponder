import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import IconButton from "@material-ui/core/IconButton";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";


import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { useStyles } from "./subSettingsStyles";
import "../Settings/Settings.css";


import { addUserProfileImage } from "../../actions/image";

import { updatePassword } from "../../actions/user"



import './ProfileSettings.css'

export default function ProfileSettings(props) {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);
	const [selectedImage, setSelectedImage] = React.useState("img1");

	const [avatars, setAvatars] = React.useState([
		'https://res.cloudinary.com/ddgs1ughh/image/upload/v1607662766/bunny_ywqdka.jpg',
		'https://res.cloudinary.com/ddgs1ughh/image/upload/v1607662771/cat_fa7xjc.jpg',
		'https://res.cloudinary.com/ddgs1ughh/image/upload/v1607662775/dog_kx3jmg.jpg'
	])

	const [dialogMessage, setDialogMesage] = React.useState("");
	// const [avatars, setAvatars] = React.useReducer((avatars, { type, newFile }) => {
	// 	switch (type) {
	// 		case "add":
	// 			return [...avatars, newFile];
	// 		case "remove":
	// 			return avatars.filter(({ name }) => name !== newFile.name);
	// 		default:
	// 			return avatars;
	// 	}
	// }, []);
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [uploadedImage, setUploadedImage] = React.useState(null);

	//Should initialize state with current username
	const [values, setValues] = React.useState({
		name: props.currentUserInfo.name,
		password: "",
		bio: props.currentUserInfo.bio,
		profilePic: props.currentUserInfo.profileImg,
		personalData: "",
		showPassword: false,
		//app_users: props.app_users,
		//current_user_index: props.current_user_index,
		//curr_account: props.curr_account,
	});

	//Expands and collapses Accordion Components
	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const changeUsername = () => {
		// plan to update information to back-end in phase 2
		// cannot be reflected to top level
		// let current_user = values.app_users.slice()[values.current_user_index];
		// let curr_account = values.curr_account
		// curr_account = values.name
		// current_user.username = values.name;
	};

	const selectAvatar = (e) => {
		setSelectedImage(e.target.value);
	};

	const changeAvatar = async () => {
		// plan to update information to back-end in phase 2
		// setValues({...values, profilePic: avatars[selectedImage]})
		// let current_user = values.app_users.slice()[values.current_user_index];
		// current_user.profileImg = avatars[selectedImage];
		if (uploadedImage !== null && selectedImage === "img4") {
			const wasAdded = await addUserProfileImage(uploadedImage);
			if (wasAdded) {
				setDialogMesage("Your profile picture has been updated!");
			} else {
				setDialogMesage("Failed to update profile pictures!");
			}
		} else {
			console.log(avatars[selectedImage.slice(3)-1]);
			console.log(selectedImage);
			fetch(`/api/updateProfileImgByLink?image_url=${avatars[selectedImage.slice(3)-1]}`, {
				method: "PATCH",
			}).then((res) => {
				if (res.status === 200) {
					setDialogMesage("Your profile picture has been updated!");
				} else {
					setDialogMesage("Failed to update profile pictures!");
				}
			})
		}

		handleClickOpen();
	};

	const changePassword = async() => {
		if(values.password.length >= 4){
			const updated = await updatePassword(values.password);
			if(updated){
				setDialogMesage("Password Updated Successfully");
			} else {
				setDialogMesage("Error updating password, please try again later.");
			}
		} else {
			setDialogMesage("Invalid Password!");
		}
		handleClickOpen();
	}

	//Reflect input changes to hooks
	const inputChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	// Log the new input of corresponding prop when a "Save" button is pressed
	const logOutput = (prop) => (event) => {
		console.log(`new ${prop}: ${{ ...values }[prop]}`);
	};

	const hiddenFileInputRef = React.useRef();

	const handleClick = () => {
		hiddenFileInputRef.current.click();
	};

	const uploadFile = (e) => {
		const fileUploaded = e.target.files[0];

		// updateImageFiles({ type: "add", value: fileUploaded });
		setUploadedImage(fileUploaded);

		console.log("fileUploaded: ", fileUploaded);


		//this.setState({ local_image_urls: local_image_urls, image_files: image_files });
		e.target.value = null;
	};

	return (
		<div className={classes.root}>
			<Typography className={classes.sectionHeading}>
				Profile Settings
      		</Typography>

			<Accordion
				expanded={expanded === "panel1"}
				onChange={handleChange("panel1")}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1bh-content"
					id="panel1bh-header"
				>
					<Typography className={classes.heading}>Username</Typography>
					<Typography className={classes.secondaryHeading}>
						Change your username
         			 </Typography>
				</AccordionSummary>

				<AccordionDetails>
					<FormControl fullWidth className={classes.margin}>
						<InputLabel>New Username</InputLabel>
						<Input
							id="newUserNamee"
							value={values.name}
							onChange={inputChange("name")}
						/>
					</FormControl>
				</AccordionDetails>

				<AccordionActions>
					<Button size="small">Cancel</Button>
					<Button size="small" color="primary" onClick={changeUsername()}>
						Save
          			</Button>
				</AccordionActions>
			</Accordion>

			<Accordion
				expanded={expanded === "panel2"}
				onChange={handleChange("panel2")}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel2bh-content"
					id="panel2bh-header"
				>
					<Typography className={classes.heading}>Bio</Typography>
					<Typography className={classes.secondaryHeading}>
						Update your biography
          			</Typography>
				</AccordionSummary>

				<AccordionDetails>
					<FormControl fullWidth className={classes.margin}>
						<InputLabel>New Bio</InputLabel>
						<Input
							id="newUserBio"
							value={values.bio}
							onChange={inputChange("bio")}
						/>
					</FormControl>
				</AccordionDetails>

				<AccordionActions>
					<Button size="small">Cancel</Button>
					<Button size="small" color="primary" onClick={logOutput("bio")}>
						Save
          			</Button>
				</AccordionActions>
			</Accordion>

			<Accordion
				expanded={expanded === "panel3"}
				onChange={handleChange("panel3")}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel3bh-content"
					id="panel3bh-header"
				>
					<Typography className={classes.heading}>Profile Picture</Typography>
					<Typography className={classes.secondaryHeading}>
						Update your profile picture
          			</Typography>
				</AccordionSummary>

				<AccordionDetails>
					<FormControl className={classes.margin}>
						<div className="avatar-settings">
							<div className="avatar-selector-wrapper">
								<img className="img" src={avatars[0]} alt="profile-pic" />
								<Radio
									checked={selectedImage === "img1"}
									onChange={selectAvatar}
									value="img1"
									name="default img1"
									inputProps={{ "aria-label": "img1" }}
								/>
							</div>
							<div className="avatar-selector-wrapper">
								<img className="img" src={avatars[1]} alt="profile-pic" />
								<Radio
									checked={selectedImage === "img2"}
									onChange={selectAvatar}
									value="img2"
									name="default img2"
									inputProps={{ "aria-label": "img2" }}
								/>
							</div>
							<div className="avatar-selector-wrapper">
								<img className="img" src={avatars[2]} alt="profile-pic" />
								<Radio
									checked={selectedImage === "img3"}
									onChange={selectAvatar}
									value="img3"
									name="default img3"
									inputProps={{ "aria-label": "img3" }}
								/>
							</div>
							<div className="avatar-selector-wrapper">
								<img className="img" src={uploadedImage !== null ? URL.createObjectURL(uploadedImage) : props.currentUserInfo.profileImg} alt="profile-pic" />
								<Radio
									checked={selectedImage === "img4"}
									onChange={selectAvatar}
									value="img4"
									name="custom img"
									inputProps={{ "aria-label": "img4" }}
								/>
							</div>

						</div>
					</FormControl>

				</AccordionDetails>

				<AccordionActions>
					<IconButton
						//classes={{ root: classes.iconButtonRoot}}
						id="profile-attach-button"
						onClick={() => handleClick()}

					>
						Upload a Photo
						<InsertPhotoIcon />
					</IconButton>
					<input
						name="image"
						ref={hiddenFileInputRef}
						onChange={(e) => uploadFile(e)}
						type="file"
						style={{ display: 'none' }}
					/>
					<Button size="small">Cancel</Button>
					<Button size="small" color="primary" onClick={() => changeAvatar()}>
						Save
          			</Button>
				</AccordionActions>

				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							{dialogMessage}
						</DialogContentText>
					</DialogContent>
				</Dialog>
			</Accordion>

			<Accordion
				expanded={expanded === "panel4"}
				onChange={handleChange("panel4")}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel4bh-content"
					id="panel4bh-header"
				>
					<Typography className={classes.heading}>Personal data</Typography>
				</AccordionSummary>

				<AccordionDetails>
					<Typography>
						Number of Posts: 321 <br />
            			Followers: 237 <br />
            			Following: 56 <br />
           				Total Likes: 5899
          			</Typography>
				</AccordionDetails>
			</Accordion>

			<Accordion
				expanded={expanded === "panel5"}
				onChange={handleChange("panel5")}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel5bh-content"
					id="panel5bh-header"
				>
					<Typography className={classes.heading}>password</Typography>
					<Typography className={classes.secondaryHeading}>
						Update your password
          			</Typography>
				</AccordionSummary>

				<AccordionDetails>
					<FormControl fullWidth className={classes.margin}>
						<InputLabel>New Password</InputLabel>
						<Input
							id="newUserPassword"
							value={values.password}
							onChange={inputChange("password")}
						/>
					</FormControl>
				</AccordionDetails>

				<AccordionActions>
					<Button size="small" color="primary" onClick={() => changePassword()}>
						Save
          			</Button>
				</AccordionActions>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							{dialogMessage}
						</DialogContentText>
					</DialogContent>
				</Dialog>
			</Accordion>
		</div>
	);
}
