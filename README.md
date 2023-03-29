# Email-Responder

This is a automatic email responder designed to acknoweldge any email that has been sent to mailto:contact@alenalex.me. This shall be hosted on cloudflare worker and would respond to any message send to through the same.

To run, install wrangler first, configure wrangler and then use `wrangler dev` 
To deploy, install wrangler first, configure wrangler `wrangler publish`

NOTE: You need to provide your gmail password at `wrangler.toml` -> `GMAIL_PASSWORD`. This will be set as an env variable on cloudflare worker. Please don't publish it back to Github