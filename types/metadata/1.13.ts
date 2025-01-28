/**
 * Metadata that describes a activity.
 */
export interface Metadata {
    /**
     * The metadata schema URL.
     */
    $schema: "https://schemas.premid.app/metadata/1.13"
    /**
     * The author of this activity.
     */
    author: {
        /**
         * The name of the user.
         */
        name: string
        /**
         * The Discord snowflake of the user.
         */
        id: string
    }
    /**
     * Any extra contributors to this activity.
     */
    contributors?: User[]
    /**
     * The service this activity is for.
     */
    service: string
    /**
     * Alternative names for the service.
     */
    altnames?: [string, ...string[]]
    /**
     * A description of the activity in multiple languages.
     */
    description: {
        /**
         * The description of the activity in the key's language.
         *
         * This interface was referenced by `undefined`'s JSON-Schema definition
         * via the `patternProperty` "^[a-z]{2,3}(?:-(?:[a-z]{2}|[0-9]{1,3}))?$".
         */
        [k: string]: string
    }
    /**
     * The service's website URL, or an array of URLs. Protocols should not be added.
     */
    url: string | [string, string, ...string[]]
    /**
     * The SemVer version of the activity. Must just be major.minor.patch.
     */
    version: string
    /**
     * The Activity System version this activity supports.
     */
    apiVersion: number
    /**
     * The logo of the service this activity is for.
     */
    logo: string
    /**
     * A thumbnail of the service this activity is for.
     */
    thumbnail: string
    /**
     * The theme color of the service this activity is for. Must be either a 6 digit or a 3 digit hex code.
     */
    color: string
    /**
     * The tags for the activity.
     */
    tags: [string, ...string[]]
    /**
     * The category the activity falls under.
     */
    category: "anime" | "games" | "music" | "socials" | "videos" | "other"
    /**
     * Whether or not the activity should run in IFrames.
     */
    iframe?: boolean
    /**
     * Whether or not the extension should be reading logs.
     */
    readLogs?: boolean
    /**
     * A regular expression used to match URLs for the activity to inject into.
     */
    regExp?: string
    /**
     * A regular expression used to match IFrames for the activity to inject into.
     */
    iFrameRegExp?: string
    /**
     * An array of settings the user can change in the activity.
     */
    settings?: {
        /**
         * The ID of the setting.
         */
        id?: string
        /**
         * The title of the setting. Required only if `multiLanguage` is disabled.
         */
        title?: string
        /**
         * The icon of the setting. Required only if `multiLanguage` is disabled.
         */
        icon?: string
        /**
         * Restrict showing this setting if another setting is the defined value.
         */
        if?: {
            /**
             * The value of the setting.
             *
             * This interface was referenced by `undefined`'s JSON-Schema definition
             * via the `patternProperty` "".
             */
            [k: string]: string | number | boolean
        }
        /**
         * The placeholder for settings that require input. Shown when the input is empty.
         */
        placeholder?: string
        /**
         * The default value of the setting. Not compatible with `values`.
         */
        value?: string | number | boolean
        /**
         * The default values of the setting. Not compatible with `value`.
         */
        values?: (string | number | boolean)[]
        /**
         * When true, strings from the `general.json` file are available for use, plus the <service>.json file. False is not allowed.
         */
        multiLanguage?: boolean
    }[]
    /**
     * Whether or not the activity has support for mobile devices.
     */
    mobile?: boolean
}
/**
 * User information.
 */
export interface User {
    /**
     * The name of the user.
     */
    name: string
    /**
     * The Discord snowflake of the user.
     */
    id: string
}
