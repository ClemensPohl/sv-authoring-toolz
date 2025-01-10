<script>
    export let c;
    export let i;
</script>

<div>
    <h1>Quiz</h1>
    {#each c.quiz as quiz}
        <div class="mb-4">
            <label for="quiz-question-{i}" class="block mb-1">Question:</label>
            <input
                id="quiz-question-{i}"
                type="text"
                bind:value={quiz.frage}
                class="w-full p-2 border rounded"
            />
        </div>
        {#each quiz.antworten as answer}
            <div class="p-2 border rounded mb-2">
                <div class="answer-container">
                    <div class="flex-grow">
                        <label for="quiz-answer-{i}" class="block mb-1">Answer:</label>
                        <input
                            id="quiz-answer-{i}"
                            type="text"
                            bind:value={answer.text}
                            class="w-full p-2 border rounded"
                        />
                    </div>
                    <div class="checkbox-container">
                        <label for="quiz-answer-correct-{i}" class="checkbox-label">
                            <input
                                id="quiz-answer-correct-{i}"
                                type="checkbox"
                                bind:checked={answer.wert}
                                class="checkbox"
                            />
                            <span>Correct</span>
                        </label>
                    </div>
                </div>
            </div>
        {/each}
    {/each}
</div>

<style>
    .answer-container {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .flex-grow {
        flex: 1;
    }

    .checkbox-container {
        min-width: 80px;
    }

    .checkbox-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
    }

    .checkbox {
        width: 1.2rem;
        height: 1.2rem;
        cursor: pointer;
    }
</style>