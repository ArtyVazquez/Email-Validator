// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default function handler(req, res) {
  
  const {
    query: { EMAIL },
    method,
  } = req

  if (method=== 'GET') {
    axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.API_KEY}&email=${EMAIL}`)
    .then(response => {
        if (response.data.deliverability == 'DELIVERABLE') {
          res.status(200).json({valid: true});
        } else {
          res.status(200).json({valid: false});
        }
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ message: "Something went wrong!" })
    });
  }

}
