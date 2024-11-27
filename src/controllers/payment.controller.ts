import Stripe from "stripe";
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";
import BadRequest from "../error/error";
import { UserRequest } from "../interface/customType";
import { findUserById } from "../services/user.service";
import { updateSubscribe } from "../services/user.service";
dotenv.config()


const stripe = new Stripe(process.env.stripe_Api_Key!)

export const createPaymentIntent = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try{
        const userId = req.user?.user_id as any

        if (!userId) {
         throw new BadRequest('User not found or token is invalid');
        }

        const user = await findUserById(userId)
        if(!user){
            throw new BadRequest('user not found')
        }

        const payment = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            payment_method_types: ['card'],
            customer_email: user.email, 
            metadata:{
                customer_name:user.firstName,
                user_id:userId,
            },
            line_items:[
                {
                  price_data: {
                    currency: 'usd',
                    product_data: {
                      name: 'Expense Tracker', // Product name (use any name for testing)
                    },
                    unit_amount: 500, // Amount in cents (500 = $5.00)
                  },
                  quantity: 1,
                },
              ],
            mode: 'payment',
            success_url: `${process.env.BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.BASE_URL}/payment/failure`,
        })
        res.status(201).send({message:"success", payment_intent_id: payment.id ,   url: payment.url,})

    }catch(error){
        next(error)
    }
}

export const success = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const sessionId = req.query.session_id as string;

        if (!sessionId) {
        throw new BadRequest( "Missing session_id in query" );
        }

        // Retrieve the session details from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Extract relevant information
        const customerEmail = session.customer_email;
        const metadata = session.metadata!;
        const paymentStatus = session.payment_status;
        console.log(metadata.user_id)

        const update = {
            isSubscribe:true,
            paymentDate:new Date(),
            paymentData:paymentStatus
        }

        const saveUpdate = await updateSubscribe(metadata.user_id, update);
        res.status(201).send({message:'payment successful', saveUpdate})
    }catch(error){
        next(error)
    }
}
export const failure = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        res.status(201).send({message:'payment failed'})

    }catch(error){
        next(error)
    }
}

