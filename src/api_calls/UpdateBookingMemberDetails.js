import axios from 'axios';

export const UpdateBookingMemberDetails = async (bookingId,memberObj) => {
    
    const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL+"labPackageBooking/"+bookingId

    // let data = JSON.stringify({
    //     "name": memberObj.name
    // });

    var bodyFormData = new FormData();
    bodyFormData.append('name', memberObj.name);

    let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: apiURL,
        data: bodyFormData
    };

    return await axios.request(config)
        .then((response) => {
            console.log(response);           
            return response;
        })
        .catch((error) => {
            return { status: 0, msg: error.message };
        });
       
}
