import { NextResponse } from "next/server";

function twimlResponse(message: string): Response {
  const twiml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<Response><Message>${message}</Message></Response>`;

  return new Response(twiml, {
    headers: { "Content-Type": "text/xml" },
  });
}

function handleCommand(command: string): string {
  switch (command) {
    case "RESERVAR":
      return (
        "Para reservar una cita, envía los siguientes datos:\n\n" +
        "RESERVAR [Nombre] [Fecha DD/MM/AAAA] [Hora HH:MM]\n\n" +
        "Ejemplo: RESERVAR Juan 25/03/2026 10:30"
      );
    case "CANCELAR":
      return (
        "Para cancelar tu cita, envía:\n\n" +
        "CANCELAR [tu número de cita]\n\n" +
        "Si no tienes el número, responde ESTADO para consultarlo."
      );
    case "ESTADO":
      return (
        "Estamos consultando el estado de tu cita...\n\n" +
        "Por favor, envía tu número de teléfono registrado o número de cita para buscarlo."
      );
    case "AYUDA":
      return (
        "Opciones disponibles:\n\n" +
        "RESERVAR - Reservar una nueva cita\n" +
        "CANCELAR - Cancelar una cita existente\n" +
        "ESTADO - Consultar el estado de tu cita\n" +
        "AYUDA - Ver este menú de opciones"
      );
    default:
      return (
        "No entendí tu mensaje. Escribe AYUDA para ver las opciones disponibles."
      );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const incomingBody = (formData.get("Body") as string) || "";
    const from = (formData.get("From") as string) || "";

    console.log(`Mensaje recibido de ${from}: ${incomingBody}`);

    const command = incomingBody.trim().toUpperCase().split(" ")[0];
    const responseText = handleCommand(command);

    return twimlResponse(responseText);
  } catch (error) {
    console.error("Error procesando webhook:", error);
    return twimlResponse(
      "Ocurrió un error procesando tu mensaje. Por favor intenta de nuevo."
    );
  }
}

// Twilio valida que el endpoint exista con GET
export async function GET() {
  return NextResponse.json({ status: "Webhook activo" });
}
