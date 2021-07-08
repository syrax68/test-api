import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { getAlbum } from '../../api/apiget';
import Typography from '@material-ui/core/Typography';
import { CustomButton } from './album.style';
import { GridPhoto } from '../GridPhoto/gridphoto';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 240,
      width: 200,
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
);

export default function Album() {
  const classes = useStyles();
  const [album, setAlbum] = useState<any>(null);
  const [itemToShow, setItemToShow] = useState<number>(3);

  useEffect (() => {
    getAlbum().then(data => setAlbum(data));
  }, []);

  return (
    <Grid container className={classes.root} spacing={2}>
         <Grid item xs={12}>
            {album?.map((item:any, key:number)=>(
                <Fragment key={key}>
                  {key < itemToShow?
                      <Grid>
                          <Typography variant="h4" color="inherit" gutterBottom>
                              {item.title}
                          </Typography>
                          <GridPhoto data={item} />
                      </Grid>
                  :null}
                </Fragment>
            ))}
        </Grid>
        <CustomButton onClick={()=>setItemToShow(itemToShow+2)}>
            Voir plus
        </CustomButton>
    </Grid>
  );
}
