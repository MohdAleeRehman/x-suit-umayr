export type RecordType = "sale" | "rent" | "property";

export type SavedRecord = {
  _id: string;
  type: RecordType;
  title: string;
  dataset: Record<string, unknown>;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
};

export type QuickLookRecord = SavedRecord & {
  computed: {
    primary: Array<{ label: string; value: string }>;
    breakdown: Array<{ label: string; value: string }>;
  };
};
