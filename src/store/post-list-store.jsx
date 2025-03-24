import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const posstListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    posstListReducer,
    default_post_list
  );

  const addPost = (userId, postBody, postTitle, reactions, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now,
        title: postTitle,
        body: postBody,
        reaction: reactions,
        userId: userId,
        tags: tags,
      },
    });
  };
  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};

const default_post_list = [
  {
    id: "1",
    title: "Going to mumbai",
    body: "hi friends i am going to mumbai for my vication hope to enjoy alot. peace out..",
    reaction: 2,
    userID: "user-9",
    tags: ["vacation", "mumbai", "enjoying"],
  },
  {
    id: "2",
    title: "B.Tech life",
    body: "4 years of college was full of ups and down. I had a lot of fun it was like a holiday package for 4 years ",
    reaction: 15,
    userID: "user-12",
    tags: ["unbelieveable", "Graduating", "Finally", "well"],
  },
  {
    id: "3",
    title: "First Job Experience",
    body: "Starting my first job was both exciting and nerve-wracking. I learned a lot and made great connections.",
    reaction: 25,
    userID: "user-45",
    tags: ["career", "first job", "learning", "growth"],
  },
  {
    id: "4",
    title: "Solo Travel Adventure",
    body: "Traveling solo to a new country was a life-changing experience. I met amazing people and explored new cultures.",
    reaction: 40,
    userID: "user-78",
    tags: ["travel", "adventure", "new experiences", "exploration"],
  },
  {
    id: "5",
    title: "Fitness Journey",
    body: "Staying consistent with my fitness routine was tough, but the results were worth it. Feeling stronger every day!",
    reaction: 30,
    userID: "user-21",
    tags: ["fitness", "health", "motivation", "discipline"],
  },
  {
    id: "6",
    title: "Learning to Cook",
    body: "Cooking used to be intimidating, but now it's one of my favorite hobbies. There's something special about making your own meals!",
    reaction: 18,
    userID: "user-34",
    tags: ["cooking", "food", "hobby", "homemade"],
  },
];
export default PostListProvider;
