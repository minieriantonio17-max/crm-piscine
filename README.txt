# CRM Piscine — PRO (Outlook + Power BI) per Vercel

Questa repo contiene:
- /public (PWA completa con mappa, CRM, MSAL Graph per Outlook)
- /api/powerbi-push.js (serverless proxy per invio a Power BI)

## Deploy rapido
1) Carica **tutto** su GitHub (root con cartelle `public/` e `api/`).
2) Su Vercel: New Project → Other → Output Directory: `public` → Deploy.

## Config Outlook (Microsoft 365)
- Crea un'app Entra ID (Azure AD) e prendi **Client ID**.
- Aggiungi redirect: **https://TUO_DOMINIO.vercel.app/**
- Inserisci il Client ID in `public/index.html` al posto di `INSERISCI_CLIENT_ID_AZURE_AD` (puoi farlo da GitHub web).
- Scopes consigliati: `User.Read`, `Calendars.ReadWrite` (più `offline_access`, `openid`, `profile`, `email`).

Uso:
- Clicca **Connetti Microsoft 365** → fai login → **Visite → Sincronizza su Outlook**.

## Config Power BI (Proxy Serverless)
- Su Vercel → Project → Settings → **Environment Variables** → aggiungi:
  - `PBI_PUSH_URL` = URL REST del tuo dataset Power BI
- Poi nell’app (tab Import/Export) clicca **Invia via serverless**.

## Note
- Tutti i dati (clienti/visite/opportunità/ordini) sono salvati in **localStorage**.
- Export disponibili: **CSV** e **.ICS** (agenda).
