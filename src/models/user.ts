import { Document, Model, model, Schema } from 'mongoose';
import { Password } from '../services/password';

// An interface to describe the properties
// that are required to create a new User
interface IUserAttrs {
    email: string,
    password: string
}

// An interface to describe the properties
// that a User Model has
interface IUserModel extends Model<IUserDoc> {
    createUser(attrs: IUserAttrs): IUserDoc;
}

// An interface to describe the properties
// that a user Document has
interface IUserDoc extends Document {
    email: string,
    password: string,
    // createdAt: string,
    // updatedAt: string
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    next();
})

userSchema.statics.createUser = (attrs: IUserAttrs) => {
    return new User(attrs)
}

const User = model<IUserDoc, IUserModel>('User', userSchema);

export { User }