import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import parse from 'html-react-parser';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [data, setData] = useState();
  const [videos, setVideos] = useState();
  const [sheet, setSheet] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSheet(newValue + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://spreadsheets.google.com/feeds/cells/1qmBlKnDlVFDJH3r3EOEB4bZiga6nIvIYOE1-5_MxNI4/${sheet}/public/values?alt=json`;
      const result = await axios(url);
      console.log(result.data);
      console.log(result.data.feed.entry);

      setData(result.data.feed.entry);
      setVideos(
        result.data.feed.entry.filter((item) =>
          item.content['$t'].includes('iframe') ? item.content['$t'] : ''
        )
      );
      // setLoading(false);
    };
    fetchData();
  }, [sheet]);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <>{data && data.map((item) => <h3>{item.content['$t']}</h3>)}</>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <>
          {videos &&
            videos.map((video) => parse(`<div>${video.content['$t']}</div>`))}
        </>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}
