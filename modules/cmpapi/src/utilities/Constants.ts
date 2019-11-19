export class Constants {
  // Todo: Possibly move validation messages into validation code

  public static readonly API_FUNCTION_NAME: string = `__tcfapi`;
  public static readonly API_LOCATOR_NAME: string = `__tcfapiLocator`;

  public static readonly EXISTING_CMP: string = 'CMP Exists already – cannot create';
  public static readonly NOT_SUPPORTED: string = `not supported by this CMP`;
  public static readonly COMMAND_NOT_SUPPORTED: string = `Command ${Constants.NOT_SUPPORTED}`;
  public static readonly CALLBACK_REQUIRED: string = `Callback required`;
  public static readonly EVENT_LISTENER_NOT_FOUND: string = `Event listener not found.`;
  public static readonly REMOVE_EVENT_LISTENER_ERROR: string = `Listener could not be removed: the parameter callback is not registered or is invalid`;
  public static readonly CUSTOM_COMMAND_FUNCTION_INVALID: string = `Custom command must be a function`;
  public static readonly COMMAND_INVALID: string = `Command Must be a non-null or non-empty string`;
  public static readonly TC_MODEL_INVALID: string = `CMP Model is not in a valid state`;
  public static readonly VENDOR_LIST_INVALID: string = `Vendor list is not valid`;
  public static readonly VENDOR_LIST_VERSION_INVALID: string = `Vendor list version is not valid`;

}
