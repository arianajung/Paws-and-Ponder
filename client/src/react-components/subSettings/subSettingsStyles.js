import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "90%",
        marginRight: "5%",
        marginLeft: "5%",
        padding: 15,
        alignContent: "center",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "33.33%",
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    sectionHeading: {
        fontSize: theme.typography.pxToRem(25),
    },
    iconButtonRoot: {
        borderRadius: 5,
        borderWidth: 3,
        "&:hover": {
            backgroundColor: "#bbb59d",
        },
    },
}));

export { useStyles };
