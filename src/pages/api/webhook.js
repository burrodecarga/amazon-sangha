import {buffer} from 'micro'
import * as admin from 'firebase-admin'
import Stripe from 'stripe';

const serviceAccount = require("../../../permission.json")

const app = !admin.apps.length? 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
}): admin.app();


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_SIGNING_SECRET

const fullfillOrder = async (session)=>{
return app.firestore()
.collection("users")
.doc(session.metadata.email)
.collection("orders")
.doc(session.id).set({
  amount: session.amount_total / 100,
  images:JSON.parse(session.metadata.images),
  timestamp: admin.firestore.FieldValue.serverTimestamp()
})
.then(()=>{
  console.log(`Order Id: ${session.id} had been add to DB`)
})
}

export default async(req, res) => {
  if(req.method === 'POST') {
   const requetBuffer = await buffer(req)
   const payload = requetBuffer.toString() 
   const sig = req.headers['stripe-signature']

   let event

   try{
     event = Stripe.Webhooks.constructEvent(payload,sig,endpointSecret)
   }catch (err){

    console.log('ERROR: ',err.message)
    return res.status(400).send(`webhooks error event Posted from stripe : ${err.message}`)
   }

   if(event.type === 'checkout.session.completed'){
     const session = event.data.object

     return fullfillOrder(session)
     .then(() => res.status(200))
     .catch(err=>res.status(400)
     .send(`webhooks error fullFillorder : ${err.message}`))
   }

  }
}

export const config={
  api:{
    bodyParser: false,
    externalResolver: true,
  }
}


//stripe listen --forward-to localhost:3000/pages/api/webhook