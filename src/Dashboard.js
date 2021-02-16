// eslint-disable jsx-props-no-spreading
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles((theme) => ({}));

function Dashboard() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const url =
        'https://spreadsheets.google.com/feeds/cells/1qmBlKnDlVFDJH3r3EOEB4bZiga6nIvIYOE1-5_MxNI4/1/public/values?alt=json';
      const result = await axios(url);
      console.log(result.data);
      console.log(result.data.feed.entry);
      setData(result.data.feed.entry);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <AppBar position="static">Hello there</AppBar>
      {loading ? (
        <Typography gutterBottom variant="h5" component="h2">
          ...loading
        </Typography>
      ) : (
        <>
          {data && data.map((item) => <h3>{item.content['$t']}</h3>)}
          {/* <Gallery photos={data.photos} /> */}
        </>
      )}
    </div>
  );
}

export default Dashboard;
