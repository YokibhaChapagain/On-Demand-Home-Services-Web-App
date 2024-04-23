const Service = require("../models/service");
const Tasker = require("../models/tasker");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const app = express();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPayment = asyncHandler(async (req, res) => {
    try {
        const { serviceId } = req.body;
        // const taskerId = req.tasker.id;
        const userId = req.user.id;

        // Fetch the service details
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({ error: "Service not found" });
        }

        // Create the Stripe payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: service.rate,
            currency: "usd",
            metadata: {
                serviceId: service._id.toString(),
                userId: userId.toString(),
                // taskerId:taskerId.toString()
                taskerId: service.taskerId.toString(),
            },
        });

        // Save the payment details
        const payment = new Payment({
            status: false,
            taskerId: service.taskerId,
            //taskerId
            userId,
        });
        await payment.save();

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while processing the payment",
        });
    }
});

app.post(
    "/webhook",
    express.json({ type: "application/json" }),
    async (req, res) => {
        let event;
        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                req.headers["stripe-signature"],
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err) {
            console.error(err);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        if (event.type === "payment_intent.succeeded") {
            const paymentIntent = event.data.object;
            const { serviceId, userId, taskerId } = paymentIntent.metadata;

            // Update the payment status
            const payment = await Payment.findOne({ userId, taskerId });
            payment.status = true;
            await payment.save();
        }

        res.json({ received: true });
    }
);

module.exports = { createPayment };
