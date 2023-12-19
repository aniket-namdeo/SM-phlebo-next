import axios from 'axios';

export const LabPackageBooking = async (status) => {
    const apiURL = "http://127.0.0.1:8000/api/labPackage/"+status;

    let data = JSON.stringify({});

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
