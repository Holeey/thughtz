import { useDispatch } from "react-redux";
import { deletePost, editPost } from "../../../features/post/postSlice.js";
import { FaEdit, FaTrash } from "react-icons/fa";
import moment from "moment";

const PostItem = ({ post }) => {
  const dispatch = useDispatch();

  const handleUpdatePost = () => {
    dispatch(editPost(post));
  };

  const handleDeletePost = () => {
    dispatch(deletePost(post._id));
  };

  return (
    <section className="post_section">
      <div>
        <h3 className="post_text">{post.postText}</h3>
        <span className="post_date">
          Posted {moment(post.createdAt).fromNow()}
        </span>
      </div>
      <div className="post_btns">
        <button className="post_edit-btn" onClick={handleUpdatePost}>
          <FaEdit /> Edit
        </button>
        <button className="post_delete-btn" onClick={handleDeletePost}>
          <FaTrash /> Delete
        </button>
      </div>
    </section>
  );
};

export default PostItem;
