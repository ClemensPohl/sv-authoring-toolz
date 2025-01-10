<script>
    export let c;
    export let i;
</script>

<div>
    <h1>Quiz</h1>
    {#each c.quiz as quiz, qIndex}
        <div class="mb-8">
            <div class="mb-4">
                <label for="quiz-question-{i}-{qIndex}" class="block mb-1">Question {qIndex + 1}:</label>
                <input
                    id="quiz-question-{i}-{qIndex}"
                    type="text"
                    bind:value={quiz.frage}
                    class="w-full p-2 border rounded"
                />
            </div>
            <div class="answers-container">
                {#each quiz.antworten as answer, aIndex}
                    <div class="p-2 border rounded mb-2">
                        <div class="answer-container">
                            <div class="checkbox-container">
                                <label for="quiz-answer-correct-{i}-{qIndex}-{aIndex}" class="checkbox-label">
                                    <input
                                        id="quiz-answer-correct-{i}-{qIndex}-{aIndex}"
                                        type="checkbox"
                                        bind:checked={answer.wert}
                                        class="custom-checkbox"
                                    />
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                            <div class="flex-grow">
                                <label for="quiz-answer-{i}-{qIndex}-{aIndex}" class="block mb-1">Answer {aIndex + 1}:</label>
                                <input
                                    id="quiz-answer-{i}-{qIndex}-{aIndex}"
                                    type="text"
                                    bind:value={answer.text}
                                    class="w-full p-2 border rounded"
                                />
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</div>

<style>
    .answers-container {
        padding-left: 2rem;
        padding-right: 2rem;
    }

    .answer-container {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .flex-grow {
        flex: 1;
    }

    .checkbox-container {
        min-width: 24px;
    }

    .checkbox-label {
        display: flex;
        align-items: center;
        cursor: pointer;
        position: relative;
    }

    /* Hide the default checkbox */
    .custom-checkbox {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    /* Create custom checkbox */
    .checkmark {
        position: relative;
        height: 24px;
        width: 24px;
        background-color: #fff;
        border: 2px solid #ccc;
        border-radius: 50%;
        transition: all 0.2s ease;
    }

    /* When checkbox is checked */
    .custom-checkbox:checked + .checkmark {
        background-color: #4CAF50;
        border-color: #4CAF50;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
        left: 8px;
        top: 4px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }

    /* Show the checkmark when checked */
    .custom-checkbox:checked + .checkmark:after {
        display: block;
    }

    /* Hover effect */
    .checkbox-label:hover .checkmark {
        border-color: #4CAF50;
    }

    /* Focus styles for accessibility */
    .custom-checkbox:focus + .checkmark {
        box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
    }

    /* When checkbox is unchecked and hovered */
    .checkbox-label:hover .custom-checkbox:not(:checked) + .checkmark {
        border-color: #ff4444;
    }

    /* When checkbox is unchecked */
    .custom-checkbox:not(:checked) + .checkmark {
        border-color: #ff4444;
    }
</style>