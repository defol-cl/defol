export type SignalEmailTemplate = 'invitacion' | 'nueva-respuesta';

interface SignalEventBase {
  type: 'email' | 'slack'
}

export interface SignalEmailEvent extends SignalEventBase {
  type: 'email'
  template: SignalEmailTemplate
  to: string
  cc?: string
  data: any
}

export interface SignalSlackEvent extends SignalEventBase {
  type: 'slack'
  channel: string
  username: string
  text: string
  title: string
  value: string
}

export type SignalEvent = SignalEmailEvent | SignalSlackEvent;
