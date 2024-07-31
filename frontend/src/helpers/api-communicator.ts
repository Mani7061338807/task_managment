import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const userLogin = async (email: string, password: string) => {
  const res = await axios.post(`${apiUrl}/login`, {
    email,
    password,
  });
  return res;
};
export const userSignup = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post(`${apiUrl}/signup`, {
    name,
    email,
    password,
  });
  return res;
};
export const checkAuthStatus = async () => {
  try {
    const res = await axiosInstance.get("/auth-status");
    return res.data;
  } catch (error) {
    return error;
  }
};

export const createTask = async (
  title: string,
  description: string,
  status: string,
  priority: string,
  deadline: Date | null
) => {
  try {
    const res = await axiosInstance.post("/tasks", {
      title,
      description,
      status,
      priority,
      deadline,
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const getUserTasks = async () => {
  try {
    const res = await axiosInstance.get("/tasks");
    return res;
  } catch (error) {
    return error;
  }
};

export const updateTaskStatusToDb = async (taskId: string, status: string) => {
  try {
    const res = await axiosInstance.post(`/task/update/status/${taskId}`, {
      status,
    });
    return res;
  } catch (error) {
    return error;
  }
};
export const updateTaskTodb = async (
  taskId: string,
  title: string,
  description: string,
  status: string,
  priority: string,
  deadline: Date | null
) => {
  try {
    const res = await axiosInstance.post(`/task/update/${taskId}`, {
      title,
      description,
      status,
      priority,
      deadline,
    });
    return res;
  } catch (error) {
    return error;
  }
};
export const DeleteTask = async (taskId: string) => {
  try {
    const res = await axiosInstance.delete(`/task/delete/${taskId}`);
    return res;
  } catch (error) {
    return error;
  }
};
export const getTask = async (taskId: string) => {
  try {
    const res = await axiosInstance.get(`/task/${taskId}`);
    return res;
  } catch (error) {
    return error;
  }
};
