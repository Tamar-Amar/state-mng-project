import mongoose, { Schema, Document } from 'mongoose';

interface IPermissionRequest extends Document {
    user: mongoose.Types.ObjectId;
    requestedPermissions: {
        canAdd: boolean;
        canUpdate: boolean;
        canDelete: boolean;
    };
    status: 'pending' | 'approved' | 'denied';
    reviewedBy?: mongoose.Types.ObjectId; // מנהל שאישר/דחה
    createdAt: Date;
    updatedAt: Date;
}

const PermissionRequestSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    requestedPermissions: {
        canAdd: { type: Boolean, default: false },
        canUpdate: { type: Boolean, default: false },
        canDelete: { type: Boolean, default: false }
    },
    status: { type: String, enum: ['pending', 'approved', 'denied'], default: 'pending' },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IPermissionRequest>('PermissionRequest', PermissionRequestSchema, 'permissionRequests-collections');
