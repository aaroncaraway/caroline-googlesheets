import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import VideoGallery from './VideoGallery';

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
  const [classData, setClassData] = useState();
  const [videoData, setVideoData] = useState();
  const [aboutData, setAboutData] = useState();

  let aboutPhoto = '';
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      // ==============================
      // SHEET 1: GETTING CLASS DATA
      const url =
        'https://spreadsheets.google.com/feeds/cells/1qmBlKnDlVFDJH3r3EOEB4bZiga6nIvIYOE1-5_MxNI4/1/public/values?alt=json';
      const result = await axios(url);
      setData(result.data.feed.entry);
      setClassData(result.data.feed.entry);

      // ==============================
      // SHEET 2: GETTING VIDEO DATA
      const videoUrl =
        'https://spreadsheets.google.com/feeds/cells/1qmBlKnDlVFDJH3r3EOEB4bZiga6nIvIYOE1-5_MxNI4/2/public/values?alt=json';
      const videoResults = await axios(videoUrl);
      setVideoData(
        videoResults.data.feed.entry.filter((item) =>
          item.content['$t'].includes('iframe') ? item.content['$t'] : ''
        )
      );

      // ==============================
      // SHEET 3: GETTING ABOUT DATA
      const aboutUrl =
        'https://spreadsheets.google.com/feeds/cells/1qmBlKnDlVFDJH3r3EOEB4bZiga6nIvIYOE1-5_MxNI4/3/public/values?alt=json';
      const aboutResults = await axios(aboutUrl);
      console.log(aboutResults);
      setAboutData(aboutResults.data.feed.entry);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const formatAboutData = () => {
      if (aboutData) {
        aboutPhoto = aboutData[1].content['$t'];
        console.log('running NOW', aboutData[1].content['$t']);
      }
    };
    formatAboutData();
  }, [aboutData]);

  const videoGallery = useMemo(() => <VideoGallery videoData={videoData} />, [
    videoData,
  ]);

  // const aboutPhoto = aboutData[1].content['$t'];
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="SCHEDULE" {...a11yProps(0)} />
          <Tab label="VIDEOS" {...a11yProps(1)} />
          <Tab label="ABOUT" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <>{data && data.map((item) => <h3>{item.content['$t']}</h3>)}</>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {videoGallery}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {aboutData && (
          <>
            <img src={aboutData[1].content['$t']} alt="caroline" />
            <h3>{aboutData[3].content['$t']}</h3>
          </>
        )}
      </TabPanel>
    </div>
  );
}
