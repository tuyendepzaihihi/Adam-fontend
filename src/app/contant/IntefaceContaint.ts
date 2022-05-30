export interface HeadCell<T> {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
}

export interface UserAdminInteface {
  id: any;
  email: string;
  phone: string;
  position: string;
  first_name: string;
  last_name: string;
}
