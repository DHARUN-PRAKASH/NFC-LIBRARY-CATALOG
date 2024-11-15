import axios from 'axios';

const API_URL = 'http://localhost:5000/attendance';

export const fetchAttendanceData = async () => {
  try {
    const response = await axios.post(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    throw error;
  }
};
