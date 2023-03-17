export interface HeadCell<T> {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
}

export interface UserAdminInterface {
  id: any;
  email: string;
  phone: string;
  position: string;
  first_name: string;
  last_name: string;
  active: number;
}

export interface UserAdmin {
  fullName: string;
  priority: number;
  id: number;
  isActive: boolean;
  email: string;
  username: string;
  password: string;
  role: number;
  phoneNumber: string;
  isDelete: number;
}

export interface DataState<T> {
  data: T;
  isLoading?: boolean;
  isError?: boolean;
  count?: number;
}



export interface ResultApi<T> {
  data: T;
  message: string;
  status: number;
}
