import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { getUserOfPost } from '../../api/apiget';

const useStyles = makeStyles((theme:any) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

export default function MainPost(props:any) {
  const classes = useStyles();
  const { post } = props;

  const [user, setUser] = useState<any>(null);
    
  useEffect (() => {
    getUserOfPost(post.userId).then(data => setUser(data));
  }, [post.userId]);

  return (
    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(/photos/back.jpg)` }}>
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {post.title}
            </Typography>
            <Typography component="h4" variant="body1" color="inherit" gutterBottom>
              {user?.name}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.body}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainPost.propTypes = {
  post: PropTypes.object,
};