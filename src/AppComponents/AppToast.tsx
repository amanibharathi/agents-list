import { Toaster } from "react-hot-toast";

const AppToast = () => {
  return (
    <div>
      <Toaster
        position="bottom-center"
        toastOptions={{
          error: {
            style: {
              background: "#C74243",
              color: "white",
            },
          },
          success: {
            style: {
              background: "#008000",
              color: "white",
            },
          },
        }}
      />
    </div>
  );
};

export default AppToast;
