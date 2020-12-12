import React, { useEffect } from "react";
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

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import { useStyles } from "./subSettingsStyles";
import "../Settings/Settings.css";
import green from "@material-ui/core/colors/green";

import { addUserProfileImage } from "../../actions/image";

import {
    getUserStatistics,
    updateBio,
    updateUsername,
    updatePassword,
} from "../../actions/settings";

import "./ProfileSettings.css";

export default function ProfileSettings(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState("img1");
    const [userStats, setUserStats] = React.useState({});
    const [dialogMessage, setDialogMesage] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [uploadedImage, setUploadedImage] = React.useState(null);
    const avatars = [
        "https://res.cloudinary.com/ddgs1ughh/image/upload/v1607662766/bunny_ywqdka.jpg",
        "https://res.cloudinary.com/ddgs1ughh/image/upload/v1607662771/cat_fa7xjc.jpg",
        "https://res.cloudinary.com/ddgs1ughh/image/upload/v1607662775/dog_kx3jmg.jpg",
    ];

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setNewBio("");
        setOpen(false);
    };

    useEffect(async () => {
        const data = await getUserStatistics();
        if (data === null) {
            setDialogMesage(
                "Failed to get user stats, please refresh the page to try again"
            );
            handleClickOpen();
        } else {
            setUserStats(data);
        }
    }, []);

    //Should initialize state with current username
    const [values, setValues] = React.useState({
        name: props.currentUserInfo.name,
        password: "",
        bio: props.currentUserInfo.bio,
        profilePic: props.currentUserInfo.profileImg,
        personalData: "",
        showPassword: false,
    });

    //Expands and collapses Accordion Components
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [newBio, setNewBio] = React.useState("");
    const changeBio = async () => {
        if (newBio === "") {
            setDialogMesage("Cannot have an empty bio");
        } else {
            const bioWasChanged = await updateBio({ newBio: newBio });
            if (bioWasChanged) {
                setDialogMesage(
                    "Bio was successfully updated, please refresh your page"
                );
            } else {
                setDialogMesage(
                    "An unexpected error has occurred, please try again later"
                );
            }
        }
        handleClickOpen();
    };

    const [newUsername, setNewUsername] = React.useState("");
    const changeUsername = async () => {
        if (newUsername === "") {
            setDialogMesage("Cannot have an empty username!");
        } else {
            const data = {
                newUsername: newUsername,
            };
            const usernameWasChanged = await updateUsername({
                newUsername: newUsername,
            });
            if (usernameWasChanged) {
                setDialogMesage(
                    "Username was successfully updated, please refresh your page"
                );
            } else {
                setDialogMesage(
                    "An unexpected error has occurred, please try again later"
                );
            }
        }
        handleClickOpen();
    };

    const selectAvatar = (e) => {
        setSelectedImage(e.target.value);
    };

    const changeAvatar = async () => {
        if (uploadedImage !== null && selectedImage === "img4") {
            const wasAdded = await addUserProfileImage(uploadedImage);
            if (wasAdded) {
                setDialogMesage("Profile picture was successfully updated");
            } else {
                setDialogMesage(
                    "An unexpected error has occurred, please try again later"
                );
            }
        } else {
            fetch(
                `/api/updateProfileImgByLink?image_url=${
                    avatars[selectedImage.slice(3) - 1]
                }`,
                {
                    method: "PATCH",
                }
            ).then((res) => {
                if (res.status === 200) {
                    setDialogMesage(
                        "Profile picture was successfully updated!"
                    );
                } else {
                    setDialogMesage(
                        "An unexpected error has occurred, please try again later"
                    );
                }
            });
        }
        handleClickOpen();
    };

    const changePassword = async () => {
        if (values.password.length >= 4) {
            const updated = await updatePassword(values.password);
            if (updated) {
                setDialogMesage("Password updated successfully");
            } else {
                setDialogMesage(
                    "An unexpected error has occurred, please try again later"
                );
            }
        } else {
            setDialogMesage("Minimum password length is 4 characters");
        }
        handleClickOpen();
    };

    //Reflect input changes to hooks
    const inputChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const hiddenFileInputRef = React.useRef();

    const handleClick = () => {
        hiddenFileInputRef.current.click();
    };

    const uploadFile = (e) => {
        const fileUploaded = e.target.files[0];
        setUploadedImage(fileUploaded);
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
                    <Typography className={classes.heading}>
                        Username
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                        Change your username
                    </Typography>
                </AccordionSummary>
                <Typography align="left" className="bio">
                    Current Username:
                </Typography>
                <Typography align="left" className="bio">
                    {props.currentUserInfo["username"] !== undefined
                        ? props.currentUserInfo["username"]
                        : "Loading..."}
                </Typography>
                <AccordionDetails>
                    <FormControl fullWidth className={classes.margin}>
                        <InputLabel>New Username</InputLabel>
                        <Input
                            id="newUserNamee"
                            value={values.name}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                    </FormControl>
                </AccordionDetails>

                <AccordionActions>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => changeUsername()}
                    >
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

                <Typography align="left" className="bio">
                    Current Bio:
                </Typography>
                <Typography align="left" className="bio">
                    {props.currentUserInfo["bio"] !== undefined
                        ? props.currentUserInfo["bio"]
                        : "Loading..."}
                </Typography>
                <AccordionDetails>
                    <FormControl fullWidth className={classes.margin}>
                        <InputLabel>New Bio</InputLabel>
                        <Input
                            id="newUserBio"
                            value={values.bio}
                            onChange={(e) => setNewBio(e.target.value)}
                        />
                    </FormControl>
                </AccordionDetails>

                <AccordionActions>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => changeBio()}
                    >
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
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography className={classes.heading}>
                        Profile Picture
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                        Update your profile picture
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <FormControl className={classes.margin}>
                        <div className="avatar-settings">
                            <div className="avatar-selector-wrapper">
                                <Typography
                                    varaint="h4"
                                    component="h1"
                                    align="center"
                                >
                                    Default 1
                                </Typography>
                                <img
                                    className="img"
                                    src={avatars[0]}
                                    alt="profile-pic"
                                />
                                <div
                                    style={{ marginRight: 69, marginLeft: 69 }}
                                >
                                    <Radio
                                        checked={selectedImage === "img1"}
                                        classes={{
                                            root: classes.root,
                                            checked: classes.checked,
                                        }}
                                        onChange={selectAvatar}
                                        value="img1"
                                        name="default img1"
                                        inputProps={{ "aria-label": "img1" }}
                                    />
                                </div>
                            </div>
                            <div className="avatar-selector-wrapper">
                                <Typography
                                    varaint="h4"
                                    component="h1"
                                    align="center"
                                >
                                    Default 2
                                </Typography>
                                <img
                                    className="img"
                                    src={avatars[1]}
                                    alt="profile-pic"
                                />
                                <div
                                    style={{ marginRight: 69, marginLeft: 79 }}
                                >
                                    <Radio
                                        checked={selectedImage === "img2"}
                                        onChange={selectAvatar}
                                        value="img2"
                                        name="default img2"
                                        inputProps={{ "aria-label": "img2" }}
                                    />
                                </div>
                            </div>
                            <div className="avatar-selector-wrapper">
                                <Typography
                                    varaint="h4"
                                    component="h1"
                                    align="center"
                                >
                                    Default 3
                                </Typography>
                                <img
                                    className="img"
                                    src={avatars[2]}
                                    alt="profile-pic"
                                />
                                <div
                                    style={{ marginRight: 69, marginLeft: 79 }}
                                >
                                    <Radio
                                        checked={selectedImage === "img3"}
                                        onChange={selectAvatar}
                                        value="img3"
                                        name="default img3"
                                        inputProps={{ "aria-label": "img3" }}
                                    />
                                </div>
                            </div>
                            <div className="avatar-selector-wrapper">
                                <Typography
                                    varaint="h4"
                                    component="h1"
                                    align="center"
                                >
                                    Your Current Photo
                                </Typography>
                                <img
                                    className="img"
                                    src={
                                        uploadedImage !== null
                                            ? URL.createObjectURL(uploadedImage)
                                            : props.currentUserInfo.profileImg
                                    }
                                    alt="profile-pic"
                                />
                                <div
                                    style={{ marginRight: 69, marginLeft: 79 }}
                                >
                                    <Radio
                                        checked={selectedImage === "img4"}
                                        onChange={selectAvatar}
                                        value="img4"
                                        name="custom img"
                                        inputProps={{ "aria-label": "img4" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </FormControl>
                </AccordionDetails>

                <AccordionActions>
                    <IconButton
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
                        style={{ display: "none" }}
                    />
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => changeAvatar()}
                    >
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
                    <Typography className={classes.heading}>
                        Password
                    </Typography>
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
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => changePassword()}
                    >
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
                expanded={expanded === "panel5"}
                onChange={handleChange("panel5")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel5bh-content"
                    id="panel5bh-header"
                >
                    <Typography className={classes.heading}>
                        Statistics
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                        Some statistics about your account
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Typography>
                        Posts: {userStats.postCount} <br></br>
                        Followers: {userStats.followerCount} <br></br>
                        Following: {userStats.followingCount} <br></br>
                        Creation Date: {userStats.creationDate}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

const styles = {
    root: {
        color: green[600],
        "&$checked": {
            color: green[500],
        },
    },
    checked: {},
};
