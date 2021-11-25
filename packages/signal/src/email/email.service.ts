import { SES } from "aws-sdk";
import { readFileSync } from "fs";
import { createTransport } from "nodemailer";
import inlineBase64 from "nodemailer-plugin-inline-base64";
import * as velocicty from "velocityjs";
import { EmailConfig, SubjectConfig } from "./email.types";
import { RootTypes } from "@defol-cl/root";

const ses = new SES();
const from = `DEFOL <${process.env.fromEmail}>`;
const bcc = `DEFOL <${process.env.bccEmail}>`;

const subjectConfig: SubjectConfig = {
  invitacion: 'Usted ha sido invitado a registrarse en DEFOL',
  'nueva-respuesta': '[DEFOL] Ha llegado respuesta, de nuestro equipo Legal',
}

const getConfig = (name: RootTypes.SignalEmailTemplate) =>
  new Promise<EmailConfig>((resolve, reject) => {
    try {
      const html = readFileSync(`./templates/${name}/content.html`, 'utf-8');
      const style = readFileSync(`./templates/${name}/styles.css`, 'utf-8');
      resolve({ html: html.replace('__style__', style), subject: subjectConfig[name] });
    } catch (error) {
      reject(error);
    }
  });

export const sendEmail = async (name: RootTypes.SignalEmailTemplate, context: any, to: string, cc?: string) => {
  const { html, subject } = await getConfig(name);
  const transporter = createTransport({ SES: ses });
  transporter.use('compile', inlineBase64({ cidPrefix: 'prefixEmail_' }));
  return await transporter.sendMail({
    subject, from, to, cc, bcc,
    html: velocicty.render(html, context)
  });
}
