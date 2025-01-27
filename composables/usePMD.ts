import { ref } from "vue";

export const usePMD = () => {
    const metadata = ref<null | object>(null);
    const files = ref<{ name: string, data: string }[]>([]);
    const { status, data, close } = useWebSocket("ws://localhost:3021", {
        autoReconnect: true,
    });

    watch(data, (d) => {
        const data: { type: string, files: { file: string, contents: string | object }[] } = JSON.parse(d);
        if (data.type !== "localPresence") return;
        for (const file of data.files) {
            console.log(file)
            if (file.file === "metadata.json" && typeof file.contents === "object") metadata.value = file.contents
            if (file.file.endsWith(".js") && typeof file.contents === "string") files.value.push({ name: file.file, data: file.contents })
            console.log(file.file.endsWith(".js"), typeof file.contents === "string")
        }

    });

    return { status, metadata, files };
};
