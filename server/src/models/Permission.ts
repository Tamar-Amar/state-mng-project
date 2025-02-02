import mongoose, { Schema, Document } from 'mongoose';

interface IPermission extends Document {
    user: mongoose.Types.ObjectId;
    canAdd: boolean;
    canUpdate: boolean;
    canDelete: boolean;
}

const PermissionSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    canAdd: { type: Boolean, default: false },
    canUpdate: { type: Boolean, default: false },
    canDelete: { type: Boolean, default: false }
});

export default mongoose.model<IPermission>('Permission', PermissionSchema, 'permissions-collections');
