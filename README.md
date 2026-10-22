# HelpKaro23 India — fixed static website

## Why requests may not have appeared
- `requests.json` must be in the same folder as `index.html`.
- The file must contain valid JSON, not JavaScript.
- The request must have `"approved": true`.
- The request must not be expired, and its amount must be between ₹1 and ₹10,000.
- GitHub Pages may take a short time to deploy. Hard-refresh the site after publishing.

## Add a request
Edit `requests.json` and use this format (replace the example with a real request only after review and explicit permission to publish):

```json
[
  {
    "id": "HK23-001",
    "approved": true,
    "title": "Help with study materials",
    "category": "Student support",
    "summary": "A student needs help purchasing essential study materials.",
    "amount": 1000,
    "status": "Open",
    "statusNote": "Request reviewed",
    "expiresAt": "2026-10-23T16:30:00+05:30",
    "publicContactUrl": ""
  }
]
```

The example expiry is illustrative; set `expiresAt` to 24 hours after the actual publication time. The website filters out expired requests in the visitor's browser.

## Files
- `index.html`: home page and request section
- `requests.json`: approved public request data
- `script.js`: loads and filters request cards
- `style.css`: responsive styles
- `terms.html`: terms and privacy draft
- `helpkaro23-logo.png`: logo

Keep all files together at the repository root. On GitHub Pages, commit changes and wait for deployment. The website does not accept or distribute donations.


## Pay / Support button
Each approved request card now has a **Pay / Support** button that opens `payment.html`.
Payments are intentionally disabled unless a specific approved request has a verified HTTPS `paymentUrl`.
Add an `id` and `paymentUrl` to that request in `requests.json` only after verifying the intended recipient and payment destination. Example fields:

```json
{
  "id": "HK23-001",
  "approved": true,
  "amount": 2000,
  "paymentUrl": "https://your-verified-payment-provider-link.example"
}
```

Replace the example URL with a real HTTPS payment link owned by the intended recipient or a legitimate provider. The site itself does not collect or hold money. Do not publish a link until you have checked the recipient and the applicable provider/legal requirements.
