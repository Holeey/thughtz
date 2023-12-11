import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  createPost,
  resetEditingPost,
  updatePost,
} from "../../../features/post/postSlice.js";

const PostForm = () => {
  const [postText, setPostText] = useState("");

  const editingPost = useSelector((state) => state.posts.editingPost);

  const dispatch = useDispatch();

  useEffect(() => {
    // If editingPost exists, populate the form with its data
    if (editingPost) {
      setPostText(editingPost.postText);
    }
  }, [editingPost]);

  const handleUpdatePost = (e) => {
    e.preventDefault();
    if (editingPost) {
      dispatch(updatePost({ id: editingPost._id, updatedPost: { postText } }));
    }
    setPostText("");
    dispatch(resetEditingPost());
  };

  const handleCancelUpdate = () => {
    setPostText("");
    dispatch(resetEditingPost());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ postText }));
    setPostText("");
  };

  return (
    <div>
      <form className= {`post_form ${editingPost ? 'editing' : ''}` }onSubmit={handleSubmit}>
        <label htmlFor="postText"></label>
        <input
          className="post_input"
          type="text"
          id="postText"
          value={postText}
          placeholder="Make a post..."
          onChange={(e) => setPostText(e.target.value)}
        />
        <div>
          {editingPost ? (
            <>
              <div className= "post_update-btns" >
                <button className="post_btn" onClick={handleUpdatePost}>
                  Update
                </button>
                <button className="post_btn" onClick={handleCancelUpdate}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <button type="submit" className="post_share-btn">
              Share
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostForm;
