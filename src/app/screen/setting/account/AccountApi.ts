import { handleGet } from "../../../service/Services";

export const requestGetUserInfo = () => handleGet("customer/profile");
