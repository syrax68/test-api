import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Fragment, useEffect, useState } from "react";
import { getPhotosOfAlbum } from "../../api/apiget";
import { CustomButton } from "./gridphoto.style";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 240,
      width: 200,
    },
  }),
);

export const GridPhoto = (album:any) =>{
    const classes = useStyles();
    const [photos, setPhotos] = useState<any>(null);
    const { data } = album;
    const [itemToShow, setItemToShow] = useState<number>(4);

    useEffect (() => {
      getPhotosOfAlbum(data.id).then(data => setPhotos(data));
    }, [data.id]);

    return (
        <>
            <Grid container justifyContent="center" spacing={5}>
                {photos?.map((value:any, key:number) => (
                    <Fragment key={key}>
                      {key < itemToShow?
                      <Grid key={key} item>
                          <Paper className={classes.paper} >
                              <img src={value.thumbnailUrl} alt={value.title}/>
                              <p>{value.title}</p>
                          </Paper>
                      </Grid>:null}
                    </Fragment>
                ))}
                
            </Grid>
            <CustomButton onClick={()=>setItemToShow(itemToShow+4)}>
                Suivant
            </CustomButton>
        </>
    );
}