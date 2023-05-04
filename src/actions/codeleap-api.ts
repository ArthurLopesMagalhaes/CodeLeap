import { PostsResponse, SendPost, UpdatePost } from "../@types/Posts";
import { api } from "./axios";

export const CodeLeapAPI = {
  getPosts: () => {
    return api.get<PostsResponse>("?limit=20");
  },
  sendPost: (data: SendPost) => {
    return api.post("", data);
  },
  updatePost: (postId: number, data: UpdatePost) => {
    return api.patch(`${postId.toString()}/`, data);
  },
  deletePost: (postId: number) => {
    return api.delete(`${postId.toString()}/`);
  },
};
