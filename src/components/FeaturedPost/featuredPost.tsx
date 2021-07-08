import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import Swal from 'sweetalert2';
import { CardActionAreaCustom, CardCustom, CustomButton, GridComments, GridLink, TextUser } from './featured.style';
import { deletePost, getCommentsOfPost, getUserOfPost, updatePost } from '../../api/apiget';

const useStyles = makeStyles({
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

export default function FeaturedPost(props:any) {
  const classes = useStyles();
  const [showComments, setShowComments] = useState<boolean>(false);
  const { post } = props;
  const [itemToShow, setItemToShow] = useState<number>(3);
  const [comments, setComments] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  
    
  useEffect (() => {
    getUserOfPost(post.userId).then(data => setUser(data));
  }, [post.userId]);
    
  useEffect (() => {
    getCommentsOfPost(post.id).then(data => setComments(data));
  }, [post.id]);

  const handleComment = () =>{
    setShowComments(true);
  }

  const handleUpdate = async(data:any) =>{
    const { value: formValues }:any = await Swal.fire({
      title: 'Modification du poste '+ data.id ,
      html:
        '<p> Titre </p>'+
        '<input id="title" class="swal2-input">' +
        '<p> Description </p>'+
        '<textarea id="description" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById('title') as any)?.value,
          (document.getElementById('description') as any)?.value
        ]
      }
    })
    
    if (formValues) {
      Swal.fire({
        title: 'Voulez vous sauvegardez ?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Enregistrer`,
        denyButtonText: `Annulez`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          updatePost(data, formValues);
          Swal.fire('Success!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Les changements ne sont pas enregistrés', '', 'info')
        }
      })
    }
  }

  const handleDelete = () =>{
    deletePost(post.id);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'L\'element à été supprimer',
      showConfirmButton: false,
      timer: 1500
    })
  }

  return (
    <Grid item xs={12} md={6}>
      <CardActionAreaCustom>
        <CardCustom>
          <div className={classes.cardDetails}>
            <CardContent>
                <Typography component="h2" variant="h5">
                    {post.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {user?.name}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                    {post.body}
                </Typography>
                <GridLink container>
                  <Typography onClick={handleComment} variant="subtitle1" color="primary">
                      Commenter
                  </Typography>
                  <Typography onClick={()=>handleUpdate(post)} variant="subtitle1" color="primary">
                      Modifier
                  </Typography>
                  <Typography onClick={handleDelete} variant="subtitle1" color="primary">
                    Supprimer
                  </Typography>
                </GridLink>
            </CardContent>
          </div>
          {/* <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={post.image} title={post.imageTitle} />
          </Hidden> */}
        </CardCustom>
        {showComments && 
        <Card style={{borderRadius: '0%'}}>
            <TextField
                id="outlined-multiline-static"
                label="Votre commentaire"
                multiline
                rows={2}
                defaultValue=""
                variant="outlined"
                style={{marginTop:'8px',width:'80%'}}
            />
            <IconButton style={{marginTop: '40px'}}>
                <SendIcon />
            </IconButton>
            {comments &&<GridComments>  
              {comments.map((item:any, key:number)=>
              <>
              {key < itemToShow?
                <Grid item>
                  <TextUser>{item.email}</TextUser>
                  <span>{item.name}</span>
                  <p>{item.body}</p>
                </Grid>
              :<></>}
              </>
              )}
              <CustomButton onClick={()=>setItemToShow(itemToShow+2)}>
                Voir plus
              </CustomButton>
            </GridComments>}
        </Card>}
      </CardActionAreaCustom>
      
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};