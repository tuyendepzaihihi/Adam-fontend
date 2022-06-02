import { Store } from "react-notifications-component";

const createNotification = (params: {
  title?: string;
  message?: string;
  type: "success" | "info" | "warning" | "danger";
}) => {
  const { message, title, type } = params;
  Store.addNotification({
    title: title ?? "Thông báo",
    message: message ?? "Đây là thông báo",
    type: type ?? "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      // onScreen: true,
    },
  });
};
export { createNotification };
