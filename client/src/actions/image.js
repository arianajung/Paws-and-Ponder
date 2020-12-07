// code from react-cloudinary respository

//import image from "../../models/image";

// A function to send a POST request with a new image
export const addImage = async (file, component) => {
    // the URL for the request
    const url = "/images";

    // The data we are going to send in our request
    const imageData = new FormData();
    for (const file_idx in file) {
        imageData.append(`file${file_idx}`, file[file_idx]);
    }
    console.log("image data: ", imageData);

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: imageData,
    });

    // Send the request with fetch()
    return fetch(request)
        .then(async function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If image was added successfully, tell the user.
                const data = await res.json();

                let image_urls = [];
                for (const idx in data.result) {
                    image_urls.push(data.result[idx].image_url);//);
                }
                return image_urls;
            } else {
                // If server couldn't add the image, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                component.setState({
                    message: {
                        body: "Error: Could not add image.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a GET request to the web server,
// and then loop through them and add a list element for each image
export const getImages = (imageListComp) => {
    // the URL for the request
    const url = "/images";

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get images");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            imageListComp.setState({ imageList: json.images });
        })
        .catch(error => {
            console.log(error);
        });
};


// A function to send a DELETE request with an image PUBLIC id (id on cloudinary)
export const deleteImage = (imageId, dashboardComp, imageListComp) => {
    // the URL for the request
    const url = `/images/${imageId}`;

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "delete",
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If image was deleted successfully, tell the user.
                dashboardComp.setState({
                    message: {
                        body: "Delete successful.",
                        type: "success"
                    }
                });

                // Also remove the image from the imageList state
                // Use filter to only keep the images you want.
                const filteredList = imageListComp.state.imageList.filter(img => img.image_id !== imageId);
                imageListComp.setState(
                    { imageList: filteredList }
                );

            } else {
                // If server couldn't delete the image, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                dashboardComp.setState({
                    message: {
                        body: "Error: Could not delete image.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
}