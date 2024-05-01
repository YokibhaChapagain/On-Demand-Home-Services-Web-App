const asyncHandler = require("express-async-handler");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/payment");
const Service = require("../models/service");

const createPayment = asyncHandler(async (req, res) => {
    const { serviceId } = req.body;
    const userId = req.user.id;
    console.log(req.body);

    const service = await Service.findById(serviceId);
    if (!service) {
        return res.status(404).json({ error: "Service not found" });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "npr",
                        product_data: {
                            name: service.name,
                        },
                        unit_amount: service.rate * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });
        const payment = new Payment({
            status: true,
            amount: req.body.amount,
            taskerId: req.body.taskerId,
            userId: userId,
            serviceId: req.body.serviceId,
        });
        await payment.save();
        res.json({ url: session.url });
    } catch (error) {
        console.error("Failed to create checkout session", error);
        res.status(500).json({ error: "Failed to create payment session" });
    }
});

module.exports = { createPayment };
