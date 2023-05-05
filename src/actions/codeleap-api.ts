import { PostsResponse, SendPost, UpdatePost } from "../@types/Posts";
import { api } from "./axios";

export const CodeLeapAPI = {
  getPosts: (query: string) => {
    return api.get<PostsResponse>(query);
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
