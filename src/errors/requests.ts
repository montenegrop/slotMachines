export const codePublisherServer = "PUBLISHER_SERVER"
export const codeProviderServer = "PROVIDER_SERVER"

export function publisherCatch(error: Error) {
    console.log("error code PUBLISHER")
    return { code: codePublisherServer, name: error.name, message: error.message }
}