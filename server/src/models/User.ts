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
    permissions: {
        canAdd: boolean;
        canUpdate: boolean;
        canDelete: boolean;
    };
    permissionRequests: mongoose.Types.ObjectId[];
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
    profilePicture: { type: String }, 
    joinDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    permissions: {
        canAdd: { type: Boolean, default: false },
        canUpdate: { type: Boolean, default: false },
        canDelete: { type: Boolean, default: false }
    },
    permissionRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PermissionRequest'
      }]
});

UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema, 'users-collections');
