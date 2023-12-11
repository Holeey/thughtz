import axios from "axios";

const API_URL = "/posts/";

//Get user's post
export const getPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

//Create user's post
export const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("config:", config);

  try {
    const response = await axios.post(API_URL, postData, config);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating post:",
      error.response.data || error.message || error
    );
    throw error; // Rethrow the error or handle it accordingly
  }
};

//Update user's post
export const updatePost = async (postId, updatedPost, token) => {
    console.log("updatedPost:", updatedPost);
    console.log("updatedPostId:", postId);
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.put(API_URL + postId, updatedPost, config)
        console.log('Response:', response.data)
        return response.data
      } catch (error) {
        console.error(
            "Error updating post:",
            error.response.data || error.message || error
          );
          throw error; // Rethrow the error or handle it accordingly
      }

}
//Delete user's post
export const deletePost = async (postId, token) => {

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const response = await axios.delete(API_URL + postId, config);
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error deleting post:",
        error.response.data || error.message || error
      );
      throw error; // Rethrow the error or handle it accordingly
    }
  };

const postService = {
  createPost,
  getPosts,
  updatePost,
  deletePost
};

export default postService;
