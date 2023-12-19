import axios from 'axios';

export const SendOTP = async (mobile_no) => {
    const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL + "Doctorapi/doctorUser_login";

    let data = JSON.stringify({
        "contact": mobile_no
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: apiURL,
        data: data
    };

    return await axios.request(config)
        .then((response) => {
            const app_user_temp = {
                temp_user_id: response.data.app_temp_user_id,
                temp_user_type: response.data.app_temp_user_type,
                temp_user_mobile: mobile_no,
                temp_user_otp: response.data.app_temp_otp
            }
            localStorage.setItem("app_user_temp", JSON.stringify(app_user_temp));
            return { status: 1, msg: "" };
        })
        .catch((error) => {
            // console.log(error);
            return { status: 0, msg: error.message };
        });
}
