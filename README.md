# Doctor Online Clinic — Master Template (DotCom by Arshees)

The master copy for every doctor website. Do **not** put a real doctor's details in this repo.
Every new doctor gets their **own new repository** made from this one.

## New doctor — only after the client has confirmed

Before building, have these ready (all in the doctor's OWN name):
- the doctor's **Microsoft email** (created by DotCom)
- the doctor's **Cal.com** account (opened with that email) → its username
- the doctor's **Daily** account (opened with that email) → the room URL and the doctor's host (owner) token
- the **domain**

1. On GitHub, open this repo → **Use this template → Create a new repository**, named `dr-<name>-online-clinic`.
2. Edit **`config.js`**: doctor details, fees, UPI, WhatsApp, colours, `cal.username`, `cal.doctorEmail`, each consultation's `calSlug`, and `video.roomUrl`.
3. Replace **`doctor.jpg`** with the doctor's portrait.
4. Restyle `style.css` in the style of the client's reference website. The doctor always stays the hero.
5. **Settings → Pages →** deploy from `main`, `/ (root)`. Add the custom domain and set DNS.
6. **In Cal.com:** create one event type per consultation (slug = `calSlug`), set the location to **Link meeting → `https://<domain>/consult.html`**, and add a required **WhatsApp number** booking question.
7. **In Daily:** make the room **private with the waiting room (knocking) on**. Give the doctor the private link `https://<domain>/consult.html?host=<owner token>`.

## Files

| File | What it is | Edit per doctor? |
|---|---|---|
| `config.js` | All doctor details, fees, payment, colours | **Yes — only this** |
| `doctor.jpg` | Portrait | **Yes — replace** |
| `index.html` | Page shell | No |
| `style.css` | Design | Yes — restyle to the reference website |
| `app.js` | Page builder and booking flow | No |
| `consult.html` | In-site video room (Daily) | No |
| `qrcode.js` | UPI QR code generator | No |

## How booking works (same as the Dr Murshida site)

1. Patient picks a consultation type.
2. Pays by UPI: real QR code with the fee filled in, plus a "Pay with UPI app" button on phones. The UPI reference is optional and goes into the Cal.com booking notes.
3. The doctor's **Cal.com** calendar opens inside the website, and the patient picks a time.
4. Cal.com emails the confirmation with the video link. A "Booking request received" message shows on the site.

## Video call (same as the Dr Murshida site)

- Patients: `https://<domain>/consult.html` → enter name → waiting room → doctor admits them.
- Doctor: `https://<domain>/consult.html?host=<owner token>` (private, never share).
- The call runs inside the website using the doctor's own Daily room.

## Improving the template

Fix or improve something here once → every **future** doctor site gets it.
Existing doctor sites are not changed automatically (copy the updated `app.js` / `style.css` into them if wanted).
