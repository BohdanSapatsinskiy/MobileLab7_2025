import axiosInstance from "./axiosInstance";

export const fetchPosts = async (userId) => {
  const response = await axiosInstance.get(`/users/${userId}/posts.json`);
  return response.data || {};
};

export const createPost = async (userId, post) => {
  const response = await axiosInstance.post(`/users/${userId}/posts.json`, post);
  return response.data;
};

export const updatePost = async (userId, postId, post) => {
  const response = await axiosInstance.put(`/users/${userId}/posts/${postId}.json`, post);
  return response.data;
};

export const deletePost = async (userId, postId) => {
  const response = await axiosInstance.delete(`/users/${userId}/posts/${postId}.json`);
  return response.data;
};
