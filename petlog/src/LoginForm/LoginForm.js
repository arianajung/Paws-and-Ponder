import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

import "./styles.css";

/* Login form with username and password inputs and a button */
class LoginForm extends React.Component {
  render() {
    const { username, password, handleChange, checkCred } = this.props;

    return (
      <Container className="login-form" maxWidth="xs">
        <Typography
          className="login-header"
          align="center"
          component="h1"
          variant="h4"
        >
          Welcome Back
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Username"
          name="username"
          value={username}
          onChange={handleChange}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          label="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />

        <Grid className="link-to-signup" item>
          <Link to="/signup">{"Not Registered?"}</Link>
        </Grid>

        <Grid className="login-btn" item>
          <Button 
            variant="outlined" 
            size="large"
            onClick={checkCred}
          >
            Login
          </Button>
        </Grid>
      </Container>
    );
  }
}

export default LoginForm;
