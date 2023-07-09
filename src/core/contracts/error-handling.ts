/**
 * @since 2.0.0
 */
export interface ErrorHandling {
    /**
     * Number of times the process should throw an error until crashing and exiting
     */
    keepAlive: number;

    /**
     * @deprecated
     * Version 4 will remove this method
     */
    crash(err: Error): never;
    /**
     * A function that is called on every crash. Updates keepAlive.
     * If keepAlive is 0, the process crashes.
     * @param error
     */
    updateAlive(error: Error): void;
}
