import mongoose from 'mongoose';

// Fields needed for create
interface SoundFileAttrs {
  name: string;
  url: string;
}

// Fields returned
interface SoundFileDoc extends mongoose.Document {
  id: string;
  name: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

interface SoundFileModel extends mongoose.Model<SoundFileDoc> {
  build(attrs: SoundFileAttrs): SoundFileDoc;
}

const soundFileSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

soundFileSchema.statics.build = (attrs: SoundFileAttrs) => {
  return new SoundFile(attrs);
};

const SoundFile = mongoose.model<SoundFileDoc, SoundFileModel>(
  'SoundFile',
  soundFileSchema,
);

export { SoundFile };
