export type SignalEmailTemplate = 'invitacion' | 'nueva-respuesta';

interface SignalEventBase {
  type: 'email' | 'slack'
}

export interface SignalEmailRespuesta {
  url: string
}

export interface SignalEmailInvitacion {
  url: string
}

export interface SignalEmailEvent<E> extends SignalEventBase {
  type: 'email'
  template: SignalEmailTemplate
  to: string
  cc?: string
  data: E
}

export interface SignalSlackEvent extends SignalEventBase {
  type: 'slack'
  channel: string
  username: string
  text: string
  title: string
  value: string
}

export type SignalEmailData = SignalEmailRespuesta | SignalEmailInvitacion
export type SignalEvent = SignalEmailEvent<SignalEmailData> | SignalSlackEvent;
