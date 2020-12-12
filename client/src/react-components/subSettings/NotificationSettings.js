import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { useStyles } from "./subSettingsStyles";

export default function ProfileSettings() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    //Should initialize state with current username
    const [values, setValues] = React.useState({
        like_notify: true,
        msg_notify: false,
        follow_notify: true,
        follow_post_notify: true,
    });

    //Expands and collapses Accordion Components
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const toggleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.checked });
    };

    return (
        <div className={classes.root}>
            <Typography className={classes.sectionHeading}>
                Notifications
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
                        Turn On of Off notifications
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <FormControl component="fieldset">
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={values.like_notify}
                                        onChange={toggleChange}
                                        name="like_notify"
                                    />
                                }
                                label={
                                    "Get notified when someone likes your post"
                                }
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={values.msg_notify}
                                        onChange={toggleChange}
                                        name="msg_notify"
                                    />
                                }
                                label="Get notified when received a private message"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={values.follow_notify}
                                        onChange={toggleChange}
                                        name="follow_notify"
                                    />
                                }
                                label="Get notified when you have a new follower"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={values.follow_post_notify}
                                        onChange={toggleChange}
                                        name="follow_post_notify"
                                    />
                                }
                                label="Get notified when someone you are following makes a post"
                            />
                        </FormGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
