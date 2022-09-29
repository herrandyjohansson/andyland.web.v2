import React from "react";

const Posts = () => {
  return (
    <>
      <h1>getStaticPaths</h1>
      <div>
        Exempel över hur du sätter upp routing för ett specifik item med
        GetStaticPaths
      </div>
      <h3>Viktigt att komma ihåg!</h3>
      <ul>
        <li>Skapa först en ny mapp (post)</li>
        <li>Skapa en ny JS fil med namn [id]</li>
      </ul>
      <div>Input in URL: /lab/posts/[id]</div>
    </>
  );
};

export default Posts;
