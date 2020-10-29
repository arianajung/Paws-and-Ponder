import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '70%',
      marginLeft: 300,
      padding: 15,
      alignContent: 'center',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    sectionHeading: {
      fontSize: theme.typography.pxToRem(25),
    }
  }));

export { useStyles };