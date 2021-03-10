import { toast } from "react-toastify";

export const toastOnError = (error) => {
  console.log("error in API call!");

  if (error.response) {
    // known error
    toast.error(JSON.stringify(error.response.data));
  } else if (error.message) {
    toast.error(JSON.stringify(error.message));
  } else {
    toast.error(JSON.stringify(error));
  }
};
