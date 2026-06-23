const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory databases, initialized to empty
let bookings = [];
let transactions = [];

// Helper to generate IDs
const generateBookingId = () => 'BK' + String(bookings.length + 1).padStart(3, '0');
const generateTransactionId = () => 'TXN' + String(transactions.length + 1).padStart(3, '0');

// Get all bookings
app.get('/api/bookings', (req, res) => {
    console.log('GET /api/bookings - Fetching bookings');
    res.json(bookings);
});

// Get all transactions
app.get('/api/transactions', (req, res) => {
    console.log('GET /api/transactions - Fetching transactions');
    res.json(transactions);
});

// Create booking and transaction
app.post('/api/bookings', (req, res) => {
    console.log('POST /api/bookings - Received booking request:', req.body);
    const { fullName, email, phone, checkIn, checkOut, rooms, total, receiptUrl } = req.body;

    if (!fullName || !phone || !checkIn || !checkOut || !rooms || rooms.length === 0) {
        return res.status(400).json({ error: 'Missing required booking details (fullName, phone, dates, rooms).' });
    }

    const calculatedNights = Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)));
    
    // We expect rooms to be an array of room objects: { title: string, price: number }
    const apartmentNames = rooms.map(r => r.title).join(', ');

    const newBookingId = generateBookingId();
    const newTxnId = generateTransactionId();

    const newBooking = {
        id: newBookingId,
        guestName: fullName,
        phone: phone,
        email: email || 'N/A',
        apartment: apartmentNames,
        checkIn: checkIn,
        checkOut: checkOut,
        nights: calculatedNights,
        amount: total,
        paymentStatus: 'pending',
        status: 'pending'
    };

    const newTransaction = {
        id: newTxnId,
        bookingId: newBookingId,
        guest: fullName,
        apartment: apartmentNames,
        amount: total,
        date: new Date().toISOString().split('T')[0],
        method: 'UPI QR',
        status: 'pending',
        receiptUrl: receiptUrl || ''
    };

    bookings.push(newBooking);
    transactions.push(newTransaction);

    console.log(`Successfully created Booking ${newBookingId} and Transaction ${newTxnId}`);
    res.status(201).json({ booking: newBooking, transaction: newTransaction });
});

// Update booking status
app.put('/api/bookings/:id/status', (req, res) => {
    const bookingId = req.params.id;
    const { status } = req.body;
    console.log(`PUT /api/bookings/${bookingId}/status - Setting status to ${status}`);

    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex === -1) {
        return res.status(404).json({ error: 'Booking not found.' });
    }

    bookings[bookingIndex].status = status;
    res.json(bookings[bookingIndex]);
});

// Approve payment (updates both booking and transaction)
app.put('/api/transactions/:id/approve', (req, res) => {
    const txnId = req.params.id;
    console.log(`PUT /api/transactions/${txnId}/approve - Approving transaction`);

    const txnIndex = transactions.findIndex(t => t.id === txnId);
    if (txnIndex === -1) {
        return res.status(404).json({ error: 'Transaction not found.' });
    }

    transactions[txnIndex].status = 'completed';
    const bookingId = transactions[txnIndex].bookingId;

    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
        bookings[bookingIndex].paymentStatus = 'paid';
        bookings[bookingIndex].status = 'confirmed';
    }

    res.json({ transaction: transactions[txnIndex], booking: bookings[bookingIndex] });
});

// Reject payment (updates both booking and transaction)
app.put('/api/transactions/:id/reject', (req, res) => {
    const txnId = req.params.id;
    console.log(`PUT /api/transactions/${txnId}/reject - Rejecting transaction`);

    const txnIndex = transactions.findIndex(t => t.id === txnId);
    if (txnIndex === -1) {
        return res.status(404).json({ error: 'Transaction not found.' });
    }

    transactions[txnIndex].status = 'rejected';
    const bookingId = transactions[txnIndex].bookingId;

    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
        bookings[bookingIndex].paymentStatus = 'failed';
        bookings[bookingIndex].status = 'rejected';
    }

    res.json({ transaction: transactions[txnIndex], booking: bookings[bookingIndex] });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`VOHO Local Backend running on http://localhost:${PORT}`);
});
