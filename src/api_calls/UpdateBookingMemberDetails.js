import axios from 'axios';

export const UpdateBookingMemberDetails = async (bookingId,memberObj) => {

    //const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL+"labPackageBooking/"+bookingId
    const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL+"lab/labPackageUpdate/"

    // let data = JSON.stringify({
    //     "name": memberObj.name
    // });

    var bodyFormData = new FormData();
    bodyFormData.append('name', memberObj.name);
    bodyFormData.append('age', memberObj.age);
    bodyFormData.append('email', memberObj.email);
    bodyFormData.append('contact', memberObj.contact);
    bodyFormData.append('booking_for', memberObj.booking_for);
    bodyFormData.append('gender', memberObj.gender);
    bodyFormData.append('user_address', memberObj.user_address);
    bodyFormData.append('latitude', memberObj.latitude);
    if(memberObj.package_name){
        bodyFormData.append('package_name', memberObj.package_name);
        bodyFormData.append('package_price', memberObj.package_price);
        bodyFormData.append('package_mrp', memberObj.package_mrp);
        bodyFormData.append('package_id', memberObj.package_id);
    }   
    if(memberObj.booking_status){
        bodyFormData.append('booking_status', memberObj.booking_status);
    }
    bodyFormData.append('longitude', memberObj.longitude);
    bodyFormData.append('longitude', memberObj.longitude);
    bodyFormData.append('id', memberObj.id);

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
