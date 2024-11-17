import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// Sign-In function
export const signInUser = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:5000/signin", {
      username,
      password,
    });
    return response; // Axios automatically resolves JSON responses
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Existing attendance function (if needed)
export const fetchAttendanceData = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/attendance`);
    return response.data;
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    throw error;
  }
};
