import { Store } from "react-notifications-component";

const createNotification = (params: {
  title?: string;
  message?: string;
  type: "success" | "info" | "warning" | "danger";
}) => {
  const { message, title, type } = params;
  Store.addNotification({
    title: title ?? "Thông báo",
    message: message ?? "Api lỗi, do bạn duy làm api lởm",
    type: type ?? "success",
    insert: "top",
    container: "top-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
    },
  });
};
export { createNotification };
