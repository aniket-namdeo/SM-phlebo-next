import axios from 'axios';

export const LabPackageBooking = async (id) => {
    const apiURL = "http://127.0.0.1:8000/api/labPackageBooking";

    let data = JSON.stringify({
        "contact": mobile_no
    });

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: apiURL,
        data: data
    };
    
    try {
        const { data } = await axios.request(config);
        return data;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}
