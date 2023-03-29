/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */



export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
}

export default {
  async email(message : EmailMessage, env : any, ctx : any) {
	console.log(message.raw)
	let emailReply = `Hey ${message.from}!,
		
Your email has been delivered to me and this email simply acknowledges that the email has been succesfully delivered to me. 
I will check out your email as early as possible! :)

Note: This is an auto generated email. Please don't reply to it

Regards,
Alen Alex
	`;


	try{
		message.forward("alengeoalex@gmail.com");
	}catch(err){
		console.log("Failed to forward the email")
		emailReply = `Hey ${message.from}!,
		
This is an automated message from my worker systems to let you know that your email to contact@alenalex.me/contact-auto@alenalex.me has been failed!
This may not be due to your reasons, Retry sending the email after sometimes and if issue persist contact me using https://alenalex.me

Note: This is an auto generated email. Please don't reply to it

Regards,
Alen Alex
		`;
		return;
	}



	
	let send_request = new Request("https://api.mailchannels.net/tx/v1/send", {
	"method": "POST",
	"headers": {
		"content-type": "application/json",
	},
	"body": JSON.stringify({

		"personalizations": [

			{ "to": [ {"email": `${message.from}`,
					"name": `${message.from}`}]}
		],

		"from": {
			"email": "no-reply@alenalex.me",
			"name": "Alen Alex",
		},
		"subject": "Mail Delivery Confirmation | contact@alenalex.me",
		"content": [{
			"type": "text/plain",
			"value": emailReply,
		}],
	}),
	});

	const resp = await fetch(send_request);
	const respText = await resp.text();

	let respContent = resp.status + " " + resp.statusText + "\n\n" + respText;
	console.log(respContent);
  }
}
