import * as MediaLibrary from 'expo-media-library';

export type HandleMediaLibraryPermissionsProps = {
    /**
     * when `true`, does not call `alert()` to inform user about a *denied permission* or *API unavailability*.
     */
    skipAlerts?: boolean
}

/**
 * Checks for the availability of `MediaLibrary` API.                                   
 * checks for required permissions.                                         
 * requests permissions if not granted.                                             
 * @returns `bool`
 */
export const handleMediaLibraryPermissions = async ({ skipAlerts = false }: HandleMediaLibraryPermissionsProps = {}): Promise<boolean> => {
    const isAV = await MediaLibrary.isAvailableAsync()
    if (!isAV) {
        if (!skipAlerts)
            alert("MediaLibrary API is not available on your device!");
        return false;
    }
    const per = await MediaLibrary.getPermissionsAsync();
    if (!per.granted) {
        if (!per.canAskAgain) {
            if (!skipAlerts) alert("Access to device media is denied! you may manually grant permissions.");
            return false;
        }
        else {
            const _per = await MediaLibrary.requestPermissionsAsync() // end request permissions
            if (!_per.granted) {
                if (!skipAlerts) alert("Access to device media denied.");
                return false;
            }
        }
    }
    return true;
}