import axios from 'axios';

export const SendOTP = async (mobile_no) => {
    //const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL + "Doctorapi/doctorUser_login";
    const apiURL = `http://127.0.0.1:8000/api/sendOtp/${mobile_no}`;

    let data = JSON.stringify({
        //"contact": mobile_no
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: apiURL,
        data: data
    };

    return await axios.request(config)
        .then((response) => {
            console.log(response);
            const app_user_temp = {
                temp_user_id: response.data.id,
                temp_user_type: response.data.user_type,
                temp_user_mobile: response.data.user_contact,
                temp_user_otp: response.data.otp
            }
            console.log(app_user_temp);
            localStorage.setItem("app_user_temp", JSON.stringify(app_user_temp));
            return { status: 1, msg: "" };
        })
        .catch((error) => {
            return { status: 0, msg: error.message };
        });
       
}
