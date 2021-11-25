import { EventBridge } from "aws-sdk";
import { RootTypes } from "@defol-cl/root";

const signalBusName = process.env.SIGNAL_BUS_NAME as string;
const eventBridge = new EventBridge();

export const putEvent = (event: RootTypes.SignalEvent) => {
  if(!signalBusName) {
    throw new Error("'signalBusName' is not set");
  }
  return eventBridge.putEvents({
    Entries: [
      {
        Source: 'signal',
        EventBusName: signalBusName,
        DetailType: 'transaction',
        Time: new Date(),
        Detail: JSON.stringify(event),
      }
    ]
  }).promise();
}
