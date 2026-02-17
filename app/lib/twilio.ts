import twilio from "twilio";
import type { Appointment } from "./types";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const whatsappFrom = process.env.TWILIO_WHATSAPP_NUMBER!;

const client = twilio(accountSid, authToken);

export async function sendWhatsAppMessage(to: string, body: string) {
  const message = await client.messages.create({
    from: whatsappFrom,
    to: `whatsapp:${to}`,
    body,
  });
  return message;
}

export async function sendAppointmentConfirmation(
  to: string,
  cita: Pick<Appointment, "nombrePaciente" | "fecha" | "hora">
) {
  const body =
    `Hola ${cita.nombrePaciente}, tu cita ha sido confirmada:\n\n` +
    `Fecha: ${cita.fecha}\n` +
    `Hora: ${cita.hora}\n\n` +
    `Si necesitas cancelar, responde CANCELAR.\n` +
    `Para ver el estado de tu cita, responde ESTADO.`;

  return sendWhatsAppMessage(to, body);
}

export async function sendAppointmentReminder(
  to: string,
  cita: Pick<Appointment, "nombrePaciente" | "fecha" | "hora">
) {
  const body =
    `Recordatorio: Hola ${cita.nombrePaciente}, tienes una cita programada:\n\n` +
    `Fecha: ${cita.fecha}\n` +
    `Hora: ${cita.hora}\n\n` +
    `Responde CONFIRMAR para confirmar tu asistencia o CANCELAR para cancelar.`;

  return sendWhatsAppMessage(to, body);
}
