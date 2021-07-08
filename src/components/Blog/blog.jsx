import React, { Fragment, useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FeaturedPost from '../FeaturedPost/featuredPost';
import Header from '../Header/header';
import MainPost from '../MainPost/mainPost';
import { getPosts } from '../../api/apiget';
import { BlocTitle, CustomButton } from './blog.style';
import Album from '../Album/album';


export default function  Blog() {
    const [posts, setPosts] = useState(null);
    const [itemToShow, setItemToShow] = useState(2);
    
    useEffect (() => {
        getPosts().then(data => setPosts(data));
    }, []);

    return (
        <React.Fragment>
        <CssBaseline />
        {posts &&
         <Container maxWidth="lg">
            <Header title="Bienvenue sur notre Blog" />
            <main>
            <MainPost post={posts[posts.length-1]} />
            <BlocTitle>Nos Postes</BlocTitle>
            <Grid container spacing={4}>
                {posts?.map((post, key) => (
                  <Fragment key={key}>
                    {key < itemToShow? <FeaturedPost key={post.id} post={post} /> : null}
                  </Fragment>
                ))}
            </Grid>
            <CustomButton onClick={()=>setItemToShow(itemToShow+2)}>
                Voir plus
            </CustomButton>
            <BlocTitle>Nos Albums</BlocTitle>
            <Album />
            </main>
        </Container>}
        {/* <Footer /> */}
        </React.Fragment>
    );
}