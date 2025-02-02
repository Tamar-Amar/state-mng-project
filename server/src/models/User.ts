import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    role: 'admin' | 'user';
    profilePicture: string;
    joinDate: Date;
    isActive: boolean;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    profilePicture: { type: String }, // נשמר כנתיב לקובץ ולא בבסיס הנתונים
    joinDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
});

// Hash the password before saving
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema, 'users-collections');
