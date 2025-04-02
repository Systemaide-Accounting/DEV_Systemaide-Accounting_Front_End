
import swal2 from "sweetalert2";

export const checkUserExpiration = async () => {
    const storedValue = localStorage.getItem("user");
    const isLoginPage = window.location.href === import.meta.env.VITE_SYSTEMAIDE_LOGIN;

    console.log(window.location.href);
    console.log(import.meta.env.VITE_SYSTEMAIDE_LOGIN);
    console.log(!storedValue);
    console.log(!isLoginPage);

    if (!storedValue) {
      if (!isLoginPage) {
        const response = await swal2.fire({
          title: "You are not authenticated.",
          text: "Redirecting to login page",
          icon: "error",
          confirmButtonText: "Proceed",
          allowOutsideClick: false, // Prevent closing by clicking outside
          allowEscapeKey: false, // Prevent closing by pressing the Esc key
          showCloseButton: false, // prevent the x button
          // allowEnterKey: false // To prevent closing when enter is press
        });

        if (response.isConfirmed) {
          window.location.href = import.meta.env.VITE_SYSTEMAIDE_LOGIN;
          return;
        }
      }

    } else {
        const parsedStoredValue = JSON.parse(storedValue);
        if (Date.now() > parsedStoredValue.expiry) {
            localStorage.clear();
            if (!isLoginPage) {
              const response = await swal2.fire({
                title: "Your session has expired.",
                text: "Redirecting to login page",
                icon: "error",
                confirmButtonText: "Proceed",
                allowOutsideClick: false, // Prevent closing by clicking outside
                allowEscapeKey: false, // Prevent closing by pressing the Esc key
                showCloseButton: false, // prevent the x button
              });
        
                if (response.isConfirmed) {
                  window.location.href = import.meta.env.VITE_SYSTEMAIDE_LOGIN;
                  return;
                }
            }
        }
    }
  };