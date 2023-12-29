import axios from 'axios';

export const UpdateHandoverLabDetails = async (subObj,bookIdArray) => {

    var userId = 0;
    if (JSON.parse(localStorage.getItem("app_user_temp")).temp_user_id) {
        var userId = JSON.parse(localStorage.getItem("app_user_temp")).temp_user_id;
    } else {
        var userId = 0;
    }
    const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL+"lab/handoverToLabUpdate/"

    var bodyFormData = new FormData();
    bodyFormData.append('cash_submit', subObj.cash_submit);
    bodyFormData.append('branch_id', subObj.branch_id);
    bodyFormData.append('service_provider_id', userId);
    bodyFormData.append('package_booking_id', bookIdArray);

    let config = {
        method: 'post',
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
