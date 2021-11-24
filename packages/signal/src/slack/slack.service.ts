import axios from "axios";

const slackHookUrl = process.env.slackHookUrl as string;

export const sendMessage = async (channel: string, username: string, text: string, title: string, value: string) => {
  await axios.post(
    slackHookUrl,
    {
      channel,
      username,
      text,
      attachments: [
        {
          color: '#8697db',
          fields: [
            {
              title, value,
              short: true
            }
          ],
        }
      ]
    }
  );
}
