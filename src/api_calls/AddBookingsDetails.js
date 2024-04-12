import axios from 'axios';

export const AddBookingsDetails = async (memberObj,tubes) => {
    var userId = 0;
    if (JSON.parse(localStorage.getItem("app_user_temp")).temp_user_id) {
        var userId = JSON.parse(localStorage.getItem("app_user_temp")).temp_user_id;
    } else {
        var userId = 0;
    }
    
    
    const apiURL = process.env.NEXT_PUBLIC_API_BASE_URL+"lab/labPackageAdd";
    const splitTubes = (inputArray) => {
        const tubeTypes = inputArray.map(item => item.tubeType);
        const barcodeNumbers = inputArray.map(item => item.barcodeNumber);
        
        return { tubeTypes, barcodeNumbers };
    };
    const { tubeTypes, barcodeNumbers } = splitTubes(tubes);
    
  
    var bodyFormData = new FormData();
    bodyFormData.append('name', memberObj.name);
    bodyFormData.append('age', memberObj.age);
    bodyFormData.append('email', memberObj.email);
    bodyFormData.append('contact', memberObj.contact);
    bodyFormData.append('booking_for', memberObj.booking_for);
    bodyFormData.append('gender', memberObj.gender);
    bodyFormData.append('user_address', memberObj.user_address);
    bodyFormData.append('pincode', memberObj.pincode);
    bodyFormData.append('package_name', memberObj.package_name);
    bodyFormData.append('package_price', memberObj.package_price);
    bodyFormData.append('package_mrp', memberObj.package_mrp);
    bodyFormData.append('package_id', memberObj.package_id);
    bodyFormData.append('package_id', memberObj.package_id);
    bodyFormData.append('booking_date', memberObj.booking_date);
    bodyFormData.append('slot_time', memberObj.slot_time);
    bodyFormData.append('height', memberObj.height);
    bodyFormData.append('weight', memberObj.weight);
    bodyFormData.append('blood_group', memberObj.blood_group);
    bodyFormData.append('ref_by_doc', memberObj.ref_by_doc);
    bodyFormData.append('ref_by_lab', memberObj.ref_by_lab);
    bodyFormData.append('service_provider_id', userId);

    /*
    memberObj.packages.forEach(packageObj => {
        bodyFormData.append('packages[][package_id]', packageObj.package_id);
        bodyFormData.append('packages[][package_price]', packageObj.package_price);
        bodyFormData.append('packages[][package_mrp]', packageObj.package_mrp);
        bodyFormData.append('packages[][package_name]', packageObj.package_name);
    });
    */
    //bodyFormData.append('tubeType', tubeTypes);
    //bodyFormData.append('barcodeNumber', barcodeNumbers);

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
