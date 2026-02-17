export type AppointmentStatus = "pendiente" | "confirmada" | "cancelada" | "completada";

export interface Appointment {
  id: string;
  nombrePaciente: string;
  fecha: string; // formato YYYY-MM-DD
  hora: string; // formato HH:mm
  telefono: string; // formato internacional, ej: +521234567890
  estado: AppointmentStatus;
  notas?: string;
}

export type WhatsAppMessageType = "confirmacion" | "recordatorio" | "general";

export interface WhatsAppMessage {
  to: string; // número destino con prefijo whatsapp:
  body: string;
  type: WhatsAppMessageType;
}

export interface SendMessageRequest {
  telefono: string; // número sin prefijo whatsapp:
  tipo: WhatsAppMessageType;
  cita: Pick<Appointment, "nombrePaciente" | "fecha" | "hora">;
}
