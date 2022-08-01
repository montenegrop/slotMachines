export function publisherCatch(error: Error) {
    console.log("error code PUBLISHER")
    return { code: "PUBLISHER", error: error.name, message: error.message }
}