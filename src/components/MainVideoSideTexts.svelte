<script>
    export let c;
    export let i;
    export let videoElements;
    export let data;
    export let root;

</script>

<div class="video-container mb-2">
    <label for="video-url-{i}" class="block mb-1">VIDEO-URL:</label>
    <input
        id="video-url-{i}"
        type="url"
        bind:value={c.mainvideo}
        class="w-full p-2 border rounded"
    />

    <label for="videoFile-{i}" class="block mb-1">Upload Video:</label>
    <input
        type="file"
        id="videoFile-{i}"
        class="file_multi_video mb-2"
        accept="video/*"
        onchange={() => data.pageData.handleVideoUpload(i, root)}
    />

    <video 
        id="vplayer-{i}" 
        width="400" 
        controls 
        class="mt-2"
        bind:this={videoElements[i]}
    >
        <track
            kind="captions"
            src="media/captions.vtt"
            label="Deutsch"
            srclang="de"
            default
        />
        Your browser does not support the video tag.
    </video>
</div>

<!-- Side Texts -->
<div class="mb-2">
    <h3>Side Texts</h3>
    <div id="sidetexts-{i}">
        {#each c.sidetexts as sidetext, i}
            <div class="sidetext-container">
                <div class="sidetext-inputs-row">
                    <div class="sidetext-input-group">
                        <label for="sidetext-no-{i}">Number:</label>
                        <input
                            id="sidetext-no-{i}"
                            type="text"
                            bind:value={sidetext.no}
                        />
                    </div>
                    <div class="sidetext-input-group">
                        <label for="sidetext-start-{i}">Start Time:</label>
                        <input
                            id="sidetext-start-{i}"
                            type="text"
                            bind:value={sidetext.start}
                        />
                    </div>
                    <div class="sidetext-input-group">
                        <label for="sidetext-end-{i}">End Time:</label>
                        <input
                            id="sidetext-end-{i}"
                            type="text"
                            bind:value={sidetext.end}
                        />
                    </div>
                </div>
                <div>
                    <label for="sidetext-text-{i}">Text:</label>
                    <textarea
                        id="sidetext-text-{i}"
                        bind:value={sidetext.text}
                        class="sidetext-textarea"
                    ></textarea>
                </div>
            </div>
            <hr class="rounded" />
        {/each}
        <button
            class="btn"
            onclick={() =>
                (c.sidetexts = [
                    ...c.sidetexts,
                    { start: '1', end: '1', no: c.sidetexts.length + 1, text: '' }
                ])}
        >
            Add Side Text
        </button>
    </div>
</div>