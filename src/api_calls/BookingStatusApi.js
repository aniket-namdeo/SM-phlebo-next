import axios from 'axios';

export const updateBookingStatus = async (bookingId, newStatus) => {
  const apiURL = `http://127.0.0.1:8000/api/labPackageUpdateStatus/${bookingId}/${newStatus}`;

  try {
    const response = await axios.post(apiURL);
    return response.data;
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
};
