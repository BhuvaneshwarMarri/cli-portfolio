# backend/routers/admin.py
"""










































































































































































































































































- [ ] Exportable contact messages (CSV/JSON)- [ ] Message read/unread tracking- [ ] Admin dashboard for managing messages- [ ] Automatic email responses to users- [ ] CAPTCHA verification- [ ] Rate limiting on form submissions## Future Enhancements4. Check browser console for errors3. Test directly via EmailJS dashboard2. Check email template variables match form field names1. Verify EmailJS credentials are correct### Email Not Sending4. Ensure MongoDB is running and `contact_messages` collection exists3. Check browser console for detailed error messages2. Verify `VITE_API_URL` environment variable is correct1. Check backend is running on `http://localhost:8000`### Form Submission Fails3. Verify MongoDB connections are valid2. Check admin endpoint is accessible: `POST /admin/cache/invalidate`1. Ensure Redis is running### Cache Invalidation Not Working## Troubleshooting```}  console.log(response.data);if (response.success) {const response = await apiGet<ContactInfo>('/contact/info');import { apiGet, apiPost } from '../../utils/api';```typescriptUse the centralized API utility (`/frontend/src/utils/api.ts`) for all HTTP requests:### API Utilities```export type FormState = "idle" | "sending" | "success" | "error";export interface ContactFormData { ... }export interface Availability { ... }export interface ContactInfo { ... }```typescriptAll types are defined in `/frontend/src/pages/contact/types.ts`:### Type Safety## Code Quality```export const EMAILJS_PUBLIC_KEY  = "your_public_key";export const EMAILJS_TEMPLATE_ID = "your_template_id";export const EMAILJS_SERVICE_ID  = "your_service_id";```typescript3. Add credentials to `/frontend/src/pages/contact/constants.ts`:2. Create an email template1. Sign up at [EmailJS](https://www.emailjs.com/)To enable email notifications:### EmailJS Setup## Email Integration```python -m backend.seed.contact```bashThen run:```}    "open_to": [ ... ]    "availability": { ... },    "info": { ... },    "type": "contact_data",data = {```pythonUpdate contact information by editing `/backend/seed/contact.py`:### Backend Seed Data```VITE_ENABLE_CACHE_REFRESH=trueVITE_API_URL=http://localhost:8000```envCreate a `.env` file in the frontend directory:### Environment Variables## Configuration```curl -X POST http://localhost:8000/admin/cache/invalidate```bash### Direct API Call```  • mongo:contact:contact_data  • mongo:about:home_data  • mongo:experience:experience_data  • mongo:skills:skills_data  • mongo:education:education_data  • github:repos:BhuvaneshwarMarriCleared 6 cache keys:✓ Cache invalidated successfully$ :bfetch```**Terminal Output:**This clears all Redis cache entries and forces data to be fetched fresh from MongoDB on the next request.```:bfetch```bashUse the `:bfetch` terminal command to refresh cached data:### Manual Cache Refresh## Cache Management```}  );    </>      <button onClick={() => handleSubmit(form)}>Send</button>      <email>{contactInfo?.email}</email>    <>  return (  };    }      console.error(err.message);    } catch (err) {      console.log(result.message);      const result = await submitForm(form);    try {  const handleSubmit = async (form: FormData) => {  const { contactInfo, submitForm } = useContactData();export default function ContactPage() {import useContactData from './useContactForm';```typescript### Example Usage```} = useContactData();  submitForm,     // Async function to submit form  error,          // Error message if any  loading,        // Loading state  openTo,         // Array of opportunities  availability,   // Availability details  contactInfo,    // Contact information objectconst {```typescriptCustom React hook for fetching contact information and submitting forms.### Hook: `useContactData()`## Frontend Integration- `read`: Boolean flag (default: false)- `submitted_at`: ISO timestamp of submission- `message`: Message body- `subject`: Message subject- `from_email`: Sender's email- `from_name`: Sender's nameMessages are stored in the `contact_messages` collection with the following fields:### Data Storage```}  "message": "Thank you for reaching out. I'll get back to you soon."  "id": "507f1f77bcf86cd799439011",  "status": "received",{```json**Response:**```}  "message": "I'd like to collaborate on..."  "subject": "Collaboration Opportunity",  "from_email": "john@example.com",  "from_name": "John Doe",{```json**Request Body:**Submits a contact form message.#### `POST /contact````]  {"text": "Tech talks & community events", "active": false}  {"text": "Pair programming & mentoring", "active": false},  {"text": "Open-source collaborations", "active": false},  {"text": "Freelance & contract work", "active": false},  {"text": "Full-time engineering roles", "active": true},[```json**Response:**Fetches list of opportunities the user is open to.#### `GET /contact/open-to````}  "preferred_contact": "Email or LinkedIn"  "response_time": "24–48 hours",  "timezone": "IST (UTC +5:30)",  "type": "Full-time / Freelance",  "status": "● Open to work",{```json**Response:**Fetches availability and response time information.#### `GET /contact/availability````}  }    "handle": "@bhuvan"    "url": "https://twitter.com/bhuvan",  "twitter": {  },    "handle": "linkedin.com/in/bhuvan"    "url": "https://linkedin.com/in/bhuvan",  "linkedin": {  },    "handle": "BhuvaneshwarMarri"    "url": "https://github.com/BhuvaneshwarMarri",  "github": {  "email": "bhuvan@example.com",{```json**Response:**Fetches contact information (email, social media links).#### `GET /contact/info`### Endpoints## Backend APIThe contact module provides a complete contact form system with backend data management and cache control. Users can submit messages which are stored in MongoDB and optionally sent via email.## OverviewAdmin API - Administrative operations for cache management and data refresh.

Endpoints:
  POST /admin/cache/invalidate → Clear all caches to fetch fresh from MongoDB

Frontend users can trigger cache refresh via ':bfetch' terminal command.
This is useful after updating data in MongoDB to bypass Redis cache.
"""

from fastapi import APIRouter
from backend.cache.cache import invalidate
from backend.config import settings

router = APIRouter(prefix="/admin", tags=["admin"])

# Cache keys managed by this endpoint
CACHE_KEYS = [
    f"github:repos:{settings.github_username}",
    "mongo:education:education_data",
    "mongo:skills:skills_data",
    "mongo:experience:experience_data",
    "mongo:home:home_data",
    "mongo:contact:contact_data",
]


@router.post("/cache/invalidate")
async def bust_all_cache():
    """
    Invalidate all cached data to fetch fresh from MongoDB on next request.
    
    Clears Redis cache entries. Useful after updating data in MongoDB.
    Frontend can trigger via ':bfetch' terminal command.
    """
    for key in CACHE_KEYS:
        await invalidate(key)
    return {"ok": True, "cleared": CACHE_KEYS}