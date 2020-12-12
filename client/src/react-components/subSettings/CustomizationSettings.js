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

import { useStyles } from "./subSettingsStyles";

export default function ProfileSettings() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    //Should initialize state with users current avatar picture, and perhaps display it
    const [values, setValues] = React.useState({
        picture: "Retrieve Default Background Img",
    });

    //Expands and collapses Accordion Components
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const inputChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const logOutput = (prop) => (event) => {
        console.log(`new ${prop}: ${{ ...values }[prop]}`);
    };

    return (
        <div className={classes.root}>
            <Typography className={classes.sectionHeading}>
                Customization
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
                        Background Picture
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <FormControl fullWidth className={classes.margin}>
                        <InputLabel>Change form of input</InputLabel>
                        <Input
                            id="newBackgroundPicture"
                            value={values.picture}
                            onChange={inputChange("picture")}
                        />
                    </FormControl>
                </AccordionDetails>

                <AccordionActions>
                    <Button size="small">Cancel</Button>
                    <Button
                        size="small"
                        color="primary"
                        onClick={logOutput("picture")}
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
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>
                        Place Holder
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Typography>Implement other Customizations.</Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
