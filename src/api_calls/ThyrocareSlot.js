import axios from 'axios';

export const ThyrocareSlot = async ({pincode, newdate }) => {
    const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL + "lab/thyrocare_slot";
    var bodyFormData = new FormData();
    bodyFormData.append('pincode', pincode);
    bodyFormData.append('newdate', newdate);

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