interface IAppointmentCreateRequest {
  message: string;
}

interface IAppointmentRegisterMessageRequest {
  id: string;
  message: string;
}

interface IAppointmentUpdateStatusRequest {
  id: string;
  status: string;
}

export {
  IAppointmentCreateRequest,
  IAppointmentRegisterMessageRequest,
  IAppointmentUpdateStatusRequest,
};
