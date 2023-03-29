# Email-Responder

This is a automatic email responder designed to acknoweldge any email that has been sent to mailto:contact@alenalex.me. This shall be hosted on cloudflare worker and would respond to any message send to through the same.

To run, install wrangler first, configure wrangler and then use `wrangler dev` 
To deploy, install wrangler first, configure wrangler `wrangler publish`

NOTE: You need to provide your gmail password at `wrangler.toml` -> `GMAIL_PASSWORD`. This will be set as an env variable on cloudflare worker. Please don't publish it back to Github

## Configurations

|Key   | Configuration  |
|---|---|
|GMAIL_FORWARD_TO   | Your email address to which you wish to forward the email the client/3rd party has sent   |
|GMAIL_REPLY_EMAIL   | The address which the client/3rd party will see   |
|GMAIL_REPLY_NAME   | The name that will be used to address you on the email as well as the replied email header  |
|FAILOVER_CONTACT   | Any failover message address or website that can be used if the worker fails to send you email   |
