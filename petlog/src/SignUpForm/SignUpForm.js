import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";

import "./styles.css";

/* Sign Up form with username and password inputs and a button */
class SignUpForm extends React.Component {
  render() {
    const { username, password, handleChange, addUser } = this.props;

    return (
      <Container className="sign-up-form" maxWidth="xs">
        <Typography 
          className="sign-up-header"
          align="center"
          component="h1"
          variant="h4"
        >
          Create Account
        </Typography>
        
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Username"
        />
        
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"

        />

        <Grid
          className="link-to-login"
          item
        >
          <Link to="/">
            {"Already have an account?"}
          </Link>
        </Grid>

        <Grid
          className="sign-up-btn"
          item
        >
          <Button
            variant="outlined"
            size="large"
            onClick={addUser}
          >
            Sign Up
          </Button>
        </Grid>
      
        
        
      </Container>
    );
  }
}

export default SignUpForm;
