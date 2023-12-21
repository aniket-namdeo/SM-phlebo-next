import axios from 'axios';

export const updateBookingStatus = async (bookingId, newStatus) => {
  const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL+"lab/labPackageUpdateStatus/"+bookingId+"/"+newStatus

  try {
    const response = await axios.post(apiURL);
    return response.data;
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
};
