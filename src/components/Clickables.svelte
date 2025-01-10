<script>
    export let c;
    export let i;
</script>

<div class="mb-2">
    <h3>Clickables</h3>
    {#each c.clickables as clickable, cIndex}
        <div class="p-2 border rounded mb-2">
            <div class="mb-2">
                <label for="clickable-text-{i}-{cIndex}" class="block mb-1">Text:</label>
                <input
                    id="clickable-text-{i}-{cIndex}"
                    type="text"
                    bind:value={clickable.text}
                    class="w-full p-2 border rounded"
                />
            </div>
            <div class="mb-2">
                <label for="clickable-target-{i}-{cIndex}" class="block mb-1">Target:</label>
                <select
                    id="clickable-target-{i}-{cIndex}"
                    bind:value={clickable.target}
                    class="w-full p-2 border rounded select-input"
                >
                    <option value="_blank">_blank (New window/tab)</option>
                    <option value="_self">_self (Same frame - default)</option>
                    <option value="_parent">_parent (Parent frame)</option>
                    <option value="_top">_top (Full window body)</option>
                </select>
            </div>
            <div class="mb-2">
                <label for="clickable-url-{i}-{cIndex}" class="block mb-1">URL:</label>
                <input
                    id="clickable-url-{i}-{cIndex}"
                    type="url"
                    bind:value={clickable.url}
                    class="w-full p-2 border rounded"
                />
            </div>
            <div class="mb-2">
                <label for="clickable-color-{i}-{cIndex}" class="block mb-1">Color:</label>
                <input
                    id="clickable-color-{i}-{cIndex}"
                    type="text"
                    bind:value={clickable.color}
                    class="w-full p-2 border rounded"
                />
            </div>

            <div class="frames-container">
                <h4>Frames</h4>
                {#each clickable.frames as frame, fIndex}
                    <div class="p-2 border rounded mb-2">
                        <div class="grid grid-cols-5 gap-2">
                            <div>
                                <label for="frame-time-{i}-{cIndex}-{fIndex}" class="block mb-1">Time:</label>
                                <input
                                    id="frame-time-{i}-{cIndex}-{fIndex}"
                                    type="number"
                                    bind:value={frame.time}
                                    class="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label for="frame-x-{i}-{cIndex}-{fIndex}" class="block mb-1">X:</label>
                                <input
                                    id="frame-x-{i}-{cIndex}-{fIndex}"
                                    type="number"
                                    bind:value={frame.x}
                                    class="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label for="frame-y-{i}-{cIndex}-{fIndex}" class="block mb-1">Y:</label>
                                <input
                                    id="frame-y-{i}-{cIndex}-{fIndex}"
                                    type="number"
                                    bind:value={frame.y}
                                    class="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label for="frame-w-{i}-{cIndex}-{fIndex}" class="block mb-1">Width:</label>
                                <input
                                    id="frame-w-{i}-{cIndex}-{fIndex}"
                                    type="number"
                                    bind:value={frame.w}
                                    class="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label for="frame-h-{i}-{cIndex}-{fIndex}" class="block mb-1">Height:</label>
                                <input
                                    id="frame-h-{i}-{cIndex}-{fIndex}"
                                    type="number"
                                    bind:value={frame.h}
                                    class="w-full p-2 border rounded"
                                />
                            </div>
                        </div>
                    </div>
                {/each}
                <button
                    class="btn"
                    onclick={() => {
                        clickable.frames = [
                            ...clickable.frames,
                            { time: 0, x: 0, y: 0, w: 0, h: 0 }
                        ];
                    }}
                >
                    Add Frame
                </button>
            </div>
        </div>
    {/each}
    <button
        class="btn"
        onclick={() => {
            c.clickables = [
                ...c.clickables,
                {
                    text: '',
                    target: '',
                    url: '',
                    color: '',
                    frames: [{ time: 0, x: 0, y: 0, w: 0, h: 0 }]
                }
            ];
        }}
    >
        Add Clickable
    </button>
</div>

<style>
    .frames-container {
        margin-top: 1rem;
        padding: 1rem;
        background-color: #f8f9fa;
        border-radius: 4px;
    }

    .grid-cols-5 {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 0.5rem;
    }

    h4 {
        margin: 0 0 1rem 0;
        font-size: 1.1rem;
        color: var(--primary-blue);
    }

    select.select-input {
        appearance: none;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 8px 32px 8px 12px;
        font-size: inherit;
        font-family: inherit;
        cursor: pointer;
        line-height: 1.5;
        margin: 4px 0 16px 0;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 8px center;
        background-size: 16px;
    }

    select.select-input:hover {
        border-color: #bbb;
    }

    select.select-input:focus {
        outline: none;
        border-color: var(--primary-blue, #0077cc);
        box-shadow: 0 0 0 2px rgba(0, 119, 204, 0.1);
    }

    select.select-input option {
        padding: 8px;
        background-color: white;
        color: #333;
    }
</style>
