import React from "react";

import { Post } from "../models";

interface Props {
  post: Post;
}

const PostDisplay: React.FC<Props> = ({ post }) => {
  return <div>PostDisplay</div>;
};

export default PostDisplay;
