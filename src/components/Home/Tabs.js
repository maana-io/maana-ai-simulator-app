import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
// Material
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

// --- Internal imports
import Simulator from "../Simulator";
import StarCraft2 from "../StarCraft2";
import Carla from "../Carla";
import OpenAIGym from "../OpenAIGym";

// --- Component

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Paper square>
          <Tabs
            value={value}
            // indicatorColor="inherit"
            // textColor="inherit"
            onChange={handleChange}
            aria-label="simulator tabs"
          >
            <Tab label="Simulator" {...a11yProps(0)} />
            <Tab label="CARLA" {...a11yProps(1)} />
            <Tab label="OpenAI Gym" {...a11yProps(2)} />
            <Tab label="StarCraft II" {...a11yProps(3)} />
          </Tabs>
        </Paper>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Simulator />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Carla />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <OpenAIGym />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <StarCraft2 />
      </TabPanel>
    </div>
  );
}
