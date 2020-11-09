import React, { Component, useRef } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import MyBlog from "../../../MyBlog/MyBlog";
import { removePost } from "../../../MyBlog/actions/removePost";
import { removeComment } from "../../../MyBlog/actions/removeComment";


import "./AdminPostMenu.css"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function AdminDropDownMenu(props) {
  const {
    user,
    page,
    isPost,
    postID,
    commentID,
  } = props

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const remove = () => {
    if (isPost) {
      console.log("post")
      removePost(page, postID)
    } else {
      console.log("comment")
      console.log(page)
      console.log(postID)
      console.log(commentID)
      removeComment(page, postID, commentID)
    }
  }

  const deleteOption = (page instanceof MyBlog) ? null : (
    <MenuItem onClick={remove}>
      Delete {isPost ? 'Post' : 'Comment'}
    </MenuItem>
  ); 

  return (
    <div className={classes.root}>
      <div>
        <Button
          id="menu-button" 
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <MenuIcon/>
          </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {deleteOption}
                    <MenuItem onClick={handleClose}>Ban {user}</MenuItem>
                    <MenuItem onClick={handleClose}>test3</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}