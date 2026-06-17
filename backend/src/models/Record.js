import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema(
  {
    // User reference (will add userId when auth is implemented)
    userId: {
      type: String,
      default: 'default-user', // Will be updated with JWT userId
      required: true
    },
    
    // Record metadata
    type: {
      type: String,
      enum: ['sale', 'rent', 'property'],
      required: true
    },
    
    title: {
      type: String,
      default: '' // Will be auto-generated in pre-save hook
    },
    
    tags: {
      type: [String],
      default: []
    },
    
    // Flexible dataset - stores all calculation data
    // For Sale: { origPrice, sellPrice, propStatus, ... }
    // For Rent: { rentAnnual, rentCheques, ... }
    // For Property: { pBuilding, pUnit, ... }
    dataset: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    
    // Soft delete support
    archived: {
      type: Boolean,
      default: false
    },
    
    // Deletion tracking (for recovery)
    deletedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt automatically
  }
);

// Indexes for performance
recordSchema.index({ userId: 1, createdAt: -1 });
recordSchema.index({ userId: 1, type: 1 });
recordSchema.index({ userId: 1, archived: 1 });
recordSchema.index({ userId: 1, title: 'text' }); // Text search on title

// Virtual for formatted creation date
recordSchema.virtual('formattedDate').get(function () {
  return this.createdAt?.toLocaleDateString('en-AE') || '';
});

// Virtual for calculated title if not set
recordSchema.pre('save', function (next) {
  if (!this.title && this.dataset) {
    if (this.type === 'sale' && this.dataset.sellPrice) {
      this.title = `Sale: AED ${this.dataset.sellPrice.toLocaleString('en-US')}`;
    } else if (this.type === 'rent' && this.dataset.rentAnnual) {
      this.title = `Rent: AED ${this.dataset.rentAnnual.toLocaleString('en-US')}/year`;
    } else if (this.type === 'property' && this.dataset.pPrice) {
      this.title = `Property: AED ${this.dataset.pPrice.toLocaleString('en-US')}`;
    } else {
      this.title = `${this.type.charAt(0).toUpperCase() + this.type.slice(1)} Record`;
    }
  }
  next();
});

// Instance method to get plain object without archived records
recordSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

const Record = mongoose.model('Record', recordSchema);

export default Record;
