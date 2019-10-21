export default interface FormField {

  label: string;
  identifier: string;
  description?: string;
  updater?: {key: boolean};

};
