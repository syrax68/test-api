import axios from "axios";

const url= 'https://jsonplaceholder.typicode.com';
const posturl = '/posts';
const commenturl = '/comments';
const userurl = '/users';
const albumurl = '/albums';
const photourl = '/photos';

export const getPosts = async() =>{
    const response = await axios.get(url+posturl);
    
    return response.data;
}

export const getPostsById = async(id) =>{
    const response = await axios.get(url+posturl+'/'+id);
    
    return response.data;
}

export const getAlbum = async() =>{
    const response = await axios.get(url+albumurl);
    
    return response.data;
}

export const getPhotosOfAlbum = async(id) =>{
    const response = await axios.get(url+photourl+'?albumId='+id)

    return response.data;
}

export const getPostsByUserid = async(id) =>{
    const response = await axios.get(url+posturl+'?userId='+id)
    
    return response.data;
}

export const getCommentsOfPost = async(id) =>{
    const response = await axios.get(url+commenturl+'?postId='+id)
    
    return response.data;
}

export const getUserOfPost = async(id) =>{
    const response = await axios.get(url+userurl+'/'+id)
    
    return response.data;
}

export const updatePost = async(post, data) =>{
    const input = JSON.stringify({
        id: post.id,
        title: data[0],
        body: data[1],
        userId: post.userId,
    })
    const response = await axios.put(url+posturl+'/'+post.id, input)
    console.log(response.data)
    return response.data;
}

export const getUsers = async() =>{
    const response = await axios.get(url+userurl)
    
    return response.data;
}

export const deletePost = async(id) =>{
    const response = await axios.delete(url+posturl+'/'+id)
    console.log(response)
    return response.data;
}