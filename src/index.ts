
export interface Env {

}

export default {
  async email(message : EmailMessage, env : any, ctx : any) {
	let emailReply = `Hey ${message.from}!,
		
Your email has been delivered to me and this email simply acknowledges that the email has been succesfully delivered to me. 
I will check out your email as early as possible! :)

Note: This is an auto generated email. Please don't reply to it

Regards,
${env.GMAIL_REPLY_NAME}
`;


	try{
		message.forward(env.GMAIL_FORWARD_TO);
		console.log(`email has been forwarded to ${env.GMAIL_FORWARD_TO}`);
	}catch(err){
		console.log("Failed to forward the email")
		emailReply = `Hey ${message.from}!,
		
This is an automated message from my worker systems to let you know that your email to ${env.GMAIL_REPLY_NAME} has been failed!
This may not be due to your reasons, Retry sending the email after sometimes and if issue persist contact me using ${env.FAILOVER_CONTACT}

Note: This is an auto generated email. Please don't reply to it

Regards,
${env.GMAIL_REPLY_NAME}
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
			"email": env.GMAIL_REPLY_EMAIL,
			"name": env.GMAIL_REPLY_NAME,
		},
		"subject": `Mail Delivery Confirmation | ${env.GMAIL_REPLY_NAME}`,
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
