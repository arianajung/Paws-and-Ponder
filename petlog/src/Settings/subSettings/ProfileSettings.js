import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

import { useStyles } from './subSettingsStyles';

export default function ProfileSettings() {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  //Should initialize state with current username
  const [values, setValues] = React.useState({
      name: 'Default Name',
      password: '',
      bio: 'Default Bio',
      profilePic: '',
      personalData: '',
      showPassword: false,
  })

  //Expands and collapses Accordion Components 
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //Reflect input changes to hooks
  const inputChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // Log the new input of corresponding prop when a "Save" button is pressed
  const logOutput = (prop) => (event) => {
      console.log(`new ${prop}: ${{...values}[prop]}`);
  };

  return (
    <div className={classes.root}>

      <Typography className={classes.sectionHeading}>Profile Settings</Typography>

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
            <FormControl fullWidth className={classes.margin}>
                <InputLabel>New Username</InputLabel>
                    <Input
                        id="newUserNamee"
                        value={values.name}
                        onChange={inputChange('name')}
                    />
                </FormControl>
            </AccordionDetails>

            <AccordionActions>
                <Button size="small">Cancel</Button>
                <Button size="small" color="primary" onClick={logOutput('name')}>
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
                <FormControl fullWidth className={classes.margin}>
                    <InputLabel>New Bio</InputLabel>
                        <Input
                            id="newUserBio"
                            value={values.bio}
                            onChange={inputChange('bio')}
                        />
                    </FormControl>
            </AccordionDetails>

            <AccordionActions>
                <Button size="small">Cancel</Button>
                <Button size="small" color="primary" onClick={logOutput('bio')}>
                    Save
                </Button>
            </AccordionActions>
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
                <FormControl fullWidth className={classes.margin}>
                    <InputLabel>Need to change form of input</InputLabel>
                        <Input
                            id="newUserProfilePic"
                            value={values.profilePic}
                            onChange={inputChange('profilePic')}
                        />
                    </FormControl>
            </AccordionDetails>

            <AccordionActions>
                <Button size="small">Cancel</Button>
                <Button size="small" color="primary" onClick={logOutput('profilePic')}>
                    Save
                </Button>
            </AccordionActions>
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
                Number of Posts: 321 <br />
                Followers: 237 <br />
                Following: 56 <br />
                Total Likes: 5899
                </Typography>
            </AccordionDetails>
      </Accordion>
    </div>
  );
}
