export class Constants {

  public static readonly API_FUNCTION_NAME: string = `__tcfapi`;
  public static readonly API_LOCATOR_NAME: string = `__tcfapiLocator`;

  public static readonly EXISTING_CMP: string = 'CMP Exists already – cannot create';
  public static readonly NOT_SUPPORTED: string = `not supported by this CMP`;
  public static readonly COMMAND_NOT_SUPPORTED: string = `command ${Constants.NOT_SUPPORTED}`;
  public static readonly CALLBACK_REQUIRED: string = `callback required`;
  public static readonly COMMAND_INVALID: string = `Command Must be a non-null or non-empty string`;
  public static readonly TC_MODEL_INVALID: string = `CMP Model is not in a valid state`;
  public static readonly VENDOR_LIST_INVALID: string = `Vendor list is not valid`;
  public static readonly VENDOR_LIST_VERSION_INVALID: string = `Vendor list version is not valid`;

}
