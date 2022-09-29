import React from "react";

interface Comments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface Props {
  comments: Comments[];
}

const Lab: React.FC<Props> = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <p key={comment.id}>{comment.name}</p>
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/comments");
  const comments = await res.json();

  return {
    props: {
      comments,
    },
  };
}

export default Lab;
