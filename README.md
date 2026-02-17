# ReservaCita

Sistema de gestión de citas médicas con integración de WhatsApp bidireccional mediante Twilio.

Built with **Next.js 16** | **TypeScript** | **Tailwind CSS** | **Twilio WhatsApp API**

---

## Características

**Mensajería outbound**
- Confirmación automática de citas por WhatsApp
- Recordatorios programados antes de la cita

**Chat bidireccional (inbound)**
- `RESERVAR` — Iniciar flujo de reserva de cita
- `CANCELAR` — Cancelar una cita existente
- `ESTADO` — Consultar estado de una cita
- `AYUDA` — Ver menú de opciones disponibles

## Arquitectura

```
app/
├── api/
│   └── whatsapp/
│       ├── send/
│       │   └── route.ts        # POST - Enviar confirmaciones y recordatorios
│       └── webhook/
│           └── route.ts        # POST - Recibir mensajes (chat bidireccional)
├── lib/
│   ├── twilio.ts               # Cliente Twilio y funciones de envío
│   └── types.ts                # Interfaces TypeScript
```

### Flujo de mensajes

```
                    ┌─────────────────────────────────────────┐
                    │            OUTBOUND (envío)              │
                    │                                         │
                    │  App ──► POST /api/whatsapp/send        │
                    │              │                           │
                    │              ▼                           │
                    │          Twilio API ──► WhatsApp         │
                    └─────────────────────────────────────────┘

                    ┌─────────────────────────────────────────┐
                    │          INBOUND (recepción)             │
                    │                                         │
                    │  WhatsApp ──► Twilio                     │
                    │                  │                       │
                    │                  ▼                       │
                    │      POST /api/whatsapp/webhook          │
                    │                  │                       │
                    │                  ▼                       │
                    │         Procesa comando ──► TwiML        │
                    │                              │           │
                    │                              ▼           │
                    │                      Twilio ──► WhatsApp │
                    └─────────────────────────────────────────┘
```

## Inicio rápido

### 1. Clonar e instalar

```bash
git clone https://github.com/zampaioo9-lang/reserva-cita.git
cd reserva-cita
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
TWILIO_ACCOUNT_SID=tu_account_sid
TWILIO_AUTH_TOKEN=tu_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

> Obtén tus credenciales en [Twilio Console](https://console.twilio.com/)

### 3. Ejecutar

```bash
npm run dev
```

La app estará disponible en `http://localhost:3000`

## Uso de la API

### Enviar confirmación de cita

```bash
curl -X POST http://localhost:3000/api/whatsapp/send \
  -H "Content-Type: application/json" \
  -d '{
    "telefono": "+521234567890",
    "tipo": "confirmacion",
    "cita": {
      "nombrePaciente": "Juan Pérez",
      "fecha": "2026-03-25",
      "hora": "10:30"
    }
  }'
```

### Enviar recordatorio

```bash
curl -X POST http://localhost:3000/api/whatsapp/send \
  -H "Content-Type: application/json" \
  -d '{
    "telefono": "+521234567890",
    "tipo": "recordatorio",
    "cita": {
      "nombrePaciente": "Juan Pérez",
      "fecha": "2026-03-25",
      "hora": "10:30"
    }
  }'
```

### Tipos de mensaje disponibles

| Tipo | Descripción |
|------|-------------|
| `confirmacion` | Mensaje de confirmación con detalles de la cita |
| `recordatorio` | Recordatorio previo a la cita |
| `general` | Mensaje genérico de contacto |

## Configurar Webhook (chat bidireccional)

Para recibir mensajes de WhatsApp en desarrollo local:

1. Instala [ngrok](https://ngrok.com/) y expón tu servidor:
   ```bash
   ngrok http 3000
   ```

2. Copia la URL generada (ej: `https://abc123.ngrok.io`)

3. En [Twilio Console](https://console.twilio.com/) > Messaging > WhatsApp Sandbox, configura:
   - **When a message comes in**: `https://abc123.ngrok.io/api/whatsapp/webhook`
   - **Method**: POST

4. Envía un mensaje al número de WhatsApp Sandbox y verifica la respuesta automática.

## Tech Stack

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Next.js | 16.1.6 | Framework fullstack |
| React | 19.2.3 | UI |
| TypeScript | 5.x | Tipado estático |
| Tailwind CSS | 4.x | Estilos |
| Twilio | latest | API de WhatsApp |

## Licencia

MIT
