import { protectedApi } from ".";

const getCurrentUser = async () => {
  try {
    const response = await protectedApi.get('/me');
    const { data: user } = response.data;
    if (user) {
      return { ...user };
    }
    return {};
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message || error.toString()
    console.log('message', message)
    Promise.reject(error)
  }
};

export { getCurrentUser };