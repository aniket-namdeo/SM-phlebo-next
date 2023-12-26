import axios from 'axios';

export const AddBookingsDetails = async (memberObj) => {

    var userId = 0;
    if (JSON.parse(localStorage.getItem("app_user_temp")).temp_user_id) {
        var userId = JSON.parse(localStorage.getItem("app_user_temp")).temp_user_id;
    } else {
        var userId = 0;
    }


    const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL+"lab/labPackageAdd/";


    var bodyFormData = new FormData();
    bodyFormData.append('name', memberObj.user_name);
    bodyFormData.append('age', memberObj.user_age);
    bodyFormData.append('email', memberObj.user_email);
    bodyFormData.append('contact', memberObj.user_contact);
    bodyFormData.append('booking_for', memberObj.booking_for);
    bodyFormData.append('gender', memberObj.user_gender);
    bodyFormData.append('user_address', memberObj.user_address);
    bodyFormData.append('pincode', memberObj.pincode);
    bodyFormData.append('package_name', memberObj.package_name);
    bodyFormData.append('package_price', memberObj.package_price);
    bodyFormData.append('package_mrp', memberObj.package_mrp);
    bodyFormData.append('package_id', memberObj.package_id);
    bodyFormData.append('package_id', memberObj.package_id);
    bodyFormData.append('booking_date', memberObj.booking_date);
    bodyFormData.append('slot_time', memberObj.slot_time);
    bodyFormData.append('service_provider_id', userId);
    //bodyFormData.append('service_provider_id',service_provider_id);


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
