import {EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY} from './constants'
export async function sendViaEmailJS(data: FormData): Promise<void> {
  const payload = {
    service_id  : EMAILJS_SERVICE_ID,
    template_id : EMAILJS_TEMPLATE_ID,
    user_id     : EMAILJS_PUBLIC_KEY,
    template_params: data,
  };

  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method : "POST",
    headers: { "Content-Type": "application/json" },
    body   : JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
}
