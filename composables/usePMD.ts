import { ref } from 'vue'

export const usePMD = () => {
    const activity = ref<null | object>(null)
    const { status, data, close } = useWebSocket('ws://localhost:3021', {
        autoReconnect: true,
    })

    watch(data, (data) => {
        data = JSON.parse(data)
        if (data.type !== "localPresence") return;
        const metadataFile = data.files.find((file: { file: string }) => file.file === "metadata.json")
        console.log(metadataFile)
        if (metadataFile) activity.value = metadataFile.contents
    })


    return { status, activity }
}
