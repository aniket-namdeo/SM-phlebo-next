import axios from 'axios';

export const UpdateBookingTubeDetails = async (tubeId,bookingId,memberObj) => {

    //const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL+"labPackageBooking/"+bookingId
    const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL+"lab/labPackageTubeUpdate"

    // let data = JSON.stringify({
    //     "name": memberObj.name
    // });

    var bodyFormData = new FormData();
    bodyFormData.append('status', memberObj.status);
    bodyFormData.append('image', memberObj.image);
    bodyFormData.append('barcode_no', memberObj.barcode_no);
    bodyFormData.append('tube_type', memberObj.tube_type);
    bodyFormData.append('package_order_id', bookingId);
    if(tubeId){
        bodyFormData.append('id', tubeId);
    }else{
        bodyFormData.append('id', null);
    }

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: apiURL,
        data: bodyFormData
    };
    console.log(config);
    return await axios.request(config)
        .then((response) => {
            console.log(response);           
            return response;
        })
        .catch((error) => {
            return { status: 0, msg: error.message };
        });
       
}
