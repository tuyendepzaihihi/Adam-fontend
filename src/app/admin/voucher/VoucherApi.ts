import { ApiClient } from "../../service/ApiService";

  export interface CreateDto {
    description: string,
    endTime: string,
    eventName: string,
    image: string,
    startTime: string,
    type: boolean
  }
  export interface UpdateDto{
    eventName: string,
    id: number,
    image: string,
    isActive: boolean
  }
  
  // function
  export const requestGetEventAll = (payload?: {name?: string}) =>
  ApiClient.get("/admin/event/findAll", {params: payload});

export const requestPutUpdateEvent = (payload: UpdateDto) =>
  ApiClient.put("/admin/event/update", payload);

export const requestDeleteEvent = (payload: { eventIdList: number[] }) =>
  ApiClient.put("/admin/event/deleteByArrayId", payload);

export const requestPostCreateEvent = (payload: CreateDto) =>
  ApiClient.post("/admin/event/create", payload);