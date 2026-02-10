export type IntegerValue = {
  type: "INTEGER";
  value: number;
};

export type FloatValue = {
  type: "FLOAT";
  value: number;
};

export type StringValue = {
  type: "STRING";
  value: string;
};

export type Value = IntegerValue | FloatValue | StringValue;
