import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { useStyles } from './ProfileSettingsStyles';

export default function ProfileSettings() {
  const classes = useStyles()

  //Should initialize state with current username
  const [newUserName, setNewUserName] = React.useState("user") 
  const [expanded, setExpanded] = React.useState(false)

  //Expands and collapses Accordion Components 
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //Handles New name submission
  //TODO: Generalize to all submisstions
  function handleSubmit(event) {
    event.preventDefault();
    console.log( 'New Name:', newUserName); 
}

  return (
    <div className={classes.root}>


      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography className={classes.heading}>Username</Typography>
                <Typography className={classes.secondaryHeading}>Change your username</Typography>
            </AccordionSummary>

            <AccordionDetails>
                <TextField 
                    id="newUserNameField" 
                    label="New User Name" 
                    value={newUserName}
                    onInput={ e=>setNewUserName(e.target.value)}/>
            </AccordionDetails>

            <AccordionActions>
                <Button size="small">Cancel</Button>
                <Button size="small" color="primary" onClick={(e) => handleSubmit(e)}>
                    Save
                </Button>
            </AccordionActions>
      </Accordion>



      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
                >
                <Typography className={classes.heading}>Bio</Typography>
                <Typography className={classes.secondaryHeading}>Change your biography</Typography>
            </AccordionSummary>

            <AccordionDetails>
                <Typography>
                To be implemented
                </Typography>
            </AccordionDetails>
      </Accordion>


      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
                >
                <Typography className={classes.heading}>Profile Picture</Typography>
                <Typography className={classes.secondaryHeading}>
                Change your profile picture
                </Typography>
            </AccordionSummary>

            <AccordionDetails>
                <Typography>
                To be implemented
                </Typography>
            </AccordionDetails>
      </Accordion>



      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
                >
                <Typography className={classes.heading}>Personal data</Typography>
            </AccordionSummary>

            <AccordionDetails>
                <Typography>
                To be implemented
                </Typography>
            </AccordionDetails>
      </Accordion>
    </div>
  );
}
