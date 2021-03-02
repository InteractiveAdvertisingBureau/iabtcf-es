import {DeviceDisclosure} from './model';
import {Json} from './Json';
import {DeviceDisclosureError} from './errors';

/**
 * Processeses a device disclosure object according to IAB specifications.
 * @param {unknown} objects - Raw object that has device disclosure data.
 * @return {DeviceDisclosure} - Returns an array of processed DeviceDisclosure objects.
 */
const processDeviceDisclosure = (objects: unknown): DeviceDisclosure[] => {

  const dirtyDeviceDisclosures = Object.keys(objects).map((key) => objects[key]);
  const validKeys: string[] = [
    'domain',
    'cookieRefresh',
    'identifier',
    'maxAgeSeconds',
    'purposes',
    'types',
  ];

  return dirtyDeviceDisclosures.map((dirtyDeviceDisclosure): DeviceDisclosure => {

    /*
     * Create a clean DeviceDisclosure object with default values. */
    const cleanedDeviceDisclosure: DeviceDisclosure = {
      domain: '',
      identifier: '',
      maxAgeSeconds: null,
      purposes: [],
      type: '',
    };

    /*
     * We process the object by only taking the values with a valid key and assigning it to
     * our clean DeviceDisclosure object. */
    validKeys.forEach((validKey: string): void => {

      if (dirtyDeviceDisclosure[validKey]) {

        cleanedDeviceDisclosure[validKey] = dirtyDeviceDisclosure[validKey];

      }

    });

    /*
     * Only display the domain if disclosure of type 'web' or 'cookie'. */
    if (cleanedDeviceDisclosure.type === 'app' && cleanedDeviceDisclosure.domain.length > 0) {

      cleanedDeviceDisclosure.domain = '';

    }

    /*
     * Only display maxAgeSeconds if disclosure is of type 'cookie'. */
    if (cleanedDeviceDisclosure.type === 'app' || cleanedDeviceDisclosure.type === 'web') {

      if (cleanedDeviceDisclosure.maxAgeSeconds !== null) {

        cleanedDeviceDisclosure.maxAgeSeconds = null;

      }

    }

    return cleanedDeviceDisclosure;

  });

};

/**
 * Fetches device disclosure storage JSON file and processes it.
 * @param {string} deviceDisclosureStorageUrl - A URL to a device disclosure storage JSON file.
 * @return {DeviceDisclosure} - A Promise of processed DeviceDisclosure objects.
 */
export const getDeviceDisclosures = async (deviceDisclosureStorageUrl: string): Promise<DeviceDisclosure[]> => {

  let res;

  try {

    res = await Json.fetch(deviceDisclosureStorageUrl, false, 5000);

  } catch (err) {

    throw new DeviceDisclosureError(err.message);

  }

  return processDeviceDisclosure(res['disclosures']);

};
