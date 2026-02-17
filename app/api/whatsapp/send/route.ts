import { NextResponse } from "next/server";
import {
  sendAppointmentConfirmation,
  sendAppointmentReminder,
  sendWhatsAppMessage,
} from "@/app/lib/twilio";
import type { SendMessageRequest } from "@/app/lib/types";

export async function POST(request: Request) {
  try {
    const body: SendMessageRequest = await request.json();

    if (!body.telefono || !body.tipo || !body.cita) {
      return NextResponse.json(
        { error: "Faltan campos requeridos: telefono, tipo, cita" },
        { status: 400 }
      );
    }

    if (!body.cita.nombrePaciente || !body.cita.fecha || !body.cita.hora) {
      return NextResponse.json(
        { error: "Datos de cita incompletos: nombrePaciente, fecha, hora" },
        { status: 400 }
      );
    }

    let message;

    switch (body.tipo) {
      case "confirmacion":
        message = await sendAppointmentConfirmation(body.telefono, body.cita);
        break;
      case "recordatorio":
        message = await sendAppointmentReminder(body.telefono, body.cita);
        break;
      case "general":
        message = await sendWhatsAppMessage(
          body.telefono,
          `Hola ${body.cita.nombrePaciente}, gracias por contactarnos.`
        );
        break;
      default:
        return NextResponse.json(
          { error: "Tipo de mensaje no válido. Usa: confirmacion, recordatorio, general" },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      messageSid: message.sid,
      status: message.status,
    });
  } catch (error) {
    console.error("Error enviando WhatsApp:", error);
    return NextResponse.json(
      { error: "Error al enviar el mensaje de WhatsApp" },
      { status: 500 }
    );
  }
}
