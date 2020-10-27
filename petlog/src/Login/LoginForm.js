import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

/* Login form with username and password inputs and a button */
class LoginForm extends React.Component {
  render() {
    const { username, password, handleChange, addUser } = this.props;

    return (
      <Grid className="login-form" container spacing={2} justify="center">
        <Grid item>
          <TextField
            name="username"
            id="standard"
            label="Username"
            variant="outlined"
            size="small"
            value={username}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            name="password"
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            size="small"
            value={password}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <Button
            size="large"
            variant="contained"
            color="secondary"
            onClick={addUser}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default LoginForm;
