import mongoose from "mongoose";
import bcrypt from "bcrypt";

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phone_number: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['cashier', 'manager', 'admin'],
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, {
    timestamps: true,
}
);

staffSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

staffSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const Staff = mongoose.model('Staff', staffSchema);

export default Staff;

